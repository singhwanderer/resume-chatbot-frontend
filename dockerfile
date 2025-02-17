# Use an official Node.js runtime as a parent image
FROM node:20

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the current directory contents into the container at /usr/src/app
COPY . .

# Install any needed dependencies
RUN npm install

# Make your app available on the container's default port
EXPOSE 8080

# Define environment variables
ENV BUCKET_NAME=resume-query-chatbot-storage
ENV RESUME_FILE=resume_singh.txt

# Run the app when the container launches
CMD [ "npm", "start" ]
