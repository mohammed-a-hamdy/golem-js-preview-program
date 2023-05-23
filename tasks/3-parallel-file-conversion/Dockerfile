# Base image with Node.js 18
FROM node:18

# Install Python and pip
RUN apt-get update && \
    apt-get install -y python3 python3-pip && \
    apt-get clean

# Install gvmkit-build package
RUN pip3 install gvmkit-build

# Set the working directory
WORKDIR /app

# Copy your application code to the container
COPY . /app

# Install Node.js dependencies
RUN npm install

# Expose any necessary ports
EXPOSE 3000

# Define the command to run your application
CMD [ "npm", "start" ]
