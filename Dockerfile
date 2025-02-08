# ============================================================================
# Stage 1: Base Image
# ----------------------------------------------------------------------------
# Use the official Bun image as our base image.
# This image comes pre‑installed with Bun (a fast JavaScript runtime & package manager).
FROM oven/bun:1.0.0 AS base

# ============================================================================
# Stage 2: Install Dependencies
# ----------------------------------------------------------------------------
# We use a separate stage to install dependencies so that we can cache this layer.
FROM base AS deps

# (Optional) Install any additional OS packages if needed (for example, libc6-compat).
RUN apk add --no-cache libc6-compat

# Set the working directory inside the container.
WORKDIR /app

# Copy only the dependency files to leverage Docker’s cache.
# This assumes you have a package.json and a Bun lock file (bun.lockb).
COPY package.json bun.lock ./

# Install dependencies using Bun.
RUN bun install

# ============================================================================
# Stage 3: Build the Application
# ----------------------------------------------------------------------------
# This stage copies over the installed dependencies and application source,
# then builds the Next.js application.
FROM base AS builder

# Set working directory.
WORKDIR /app

# Copy installed node_modules from the deps stage to reuse the dependency installation.
COPY --from=deps /app/node_modules ./node_modules

# Copy the rest of the application code.
COPY . .

# Disable Next.js telemetry (optional but common for CI/CD pipelines).
ENV NEXT_TELEMETRY_DISABLED=1

# Run the build script using Bun.
# This assumes your package.json has a "build" script.
RUN bun run build

# ============================================================================
# Stage 4: Production Runner
# ----------------------------------------------------------------------------
# This stage sets up the minimal production image.
FROM base AS runner

# Set the working directory.
WORKDIR /app

# Set production environment variables.
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Create a non‑root user and group to run the app securely.
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy only the artifacts required at runtime from the builder stage.
# Copy the public assets.
COPY --from=builder /app/public ./public
# Copy the built Next.js application.
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
# Copy the node_modules and package.json.
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Switch to the non‑root user.
USER nextjs

# Expose the port the app will run on.
EXPOSE 3000

# Set an environment variable for the port (if your app reads this variable).
ENV PORT=3000

# ----------------------------------------------------------------------------
# Command to run the application.
# This uses Bun to run the "start" script defined in package.json.
CMD ["bun", "run", "start"]
