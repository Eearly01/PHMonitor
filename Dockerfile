# Use the .NET 7 SDK for building
FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build-env
WORKDIR /app

# Install Node.js 20
RUN curl -sL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs

# Install npm dependencies
COPY PHMonitor/ClientApp/package*.json PHMonitor/ClientApp/
RUN npm install --prefix PHMonitor/ClientApp

# Copy the rest of the application
COPY PHMonitor/ PHMonitor/

# Restore .NET dependencies and publish the project
WORKDIR /app/PHMonitor
RUN dotnet restore PHMonitor.csproj && \
    dotnet publish PHMonitor.csproj -c Release -o out

# Use the .NET 7 runtime for the final image
FROM mcr.microsoft.com/dotnet/aspnet:7.0
WORKDIR /app
COPY --from=build-env /app/PHMonitor/out .

# Set environment variables
ENV Client_Id=41voio47onpma1mjo76t5uo62o
ENV UserPool_Id=us-east-2_hyJOgAqH5
ENV IdentityPool_Id=us-east-2:4e601076-600b-4fb2-9948-ed3659aa818d
ENV AWS_Region=us-east-2
ENV Cognito_Domain_Prefix=elijah-early-phmonitor

# Expose port 80 for HTTP traffic
EXPOSE 80

# Set the ASP.NET Core environment to Production
ENV ASPNETCORE_ENVIRONMENT=Production

# Run the application on port 80 (or the port defined by the PORT environment variable)
CMD ASPNETCORE_URLS=http://*:$PORT dotnet PHMonitor.dll
