FROM node:13

# Copy application code.
COPY . /app/

WORKDIR /app
# Install dependencies.
RUN npm install


# Set common env vars
ENV NODE_ENV production
ENV PORT 8080
EXPOSE 8080

CMD ["npm", "start"]