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
EXPOSE 8080
CMD ASPNETCORE_URLS=http://*:$PORT dotnet PHMonitor.dll
