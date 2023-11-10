using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using PHMonitor.Data;
//using PHMonitor.Models;
using Microsoft.Extensions.Options;
using PHMonitor; // Adjusted to match the namespace of DotEnv
using PHMonitor.SQL;

Microsoft.IdentityModel.Logging.IdentityModelEventSource.ShowPII = true;

var builder = WebApplication.CreateBuilder(args);

var root = Directory.GetCurrentDirectory();
var dotenv = Path.Combine(root, ".env");
DotEnv.Load(dotenv);

builder.Configuration.AddEnvironmentVariables();

// Add services for postgres database
builder.Services.AddDbContext<AppDbContext>(options =>
        options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")
        .Replace("{DB_HOST}", Environment.GetEnvironmentVariable("DB_HOST"))
        .Replace("{DB_DB}", Environment.GetEnvironmentVariable("DB_DB"))
        .Replace("{DB_USER}", Environment.GetEnvironmentVariable("DB_USER"))
        .Replace("{DB_PASSWORD}", Environment.GetEnvironmentVariable("DB_PASSWORD"))));

// Configure AWS Cognito OpenID Connect authentication
builder.Services.AddAuthentication(options =>
{
    options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = OpenIdConnectDefaults.AuthenticationScheme;
})
.AddCookie()
.AddOpenIdConnect(options =>
{
    options.ResponseType = "code";
    options.MetadataAddress = $"https://{builder.Configuration["Cognito_Domain_Prefix"]}.auth.{builder.Configuration["AWS_Region"]}.amazoncognito.com/.well-known/openid-configuration";
    options.ClientId = builder.Configuration["Client_Id"];
    options.SaveTokens = true;
    options.CallbackPath = "/authentication/login-callback";
    options.SignedOutCallbackPath = "/authentication/logout-callback";
    options.Scope.Add("openid");
    options.Scope.Add("email");
    options.Scope.Add("profile");
});

builder.Services.AddControllersWithViews();
builder.Services.AddRazorPages();
builder.Services.AddControllers();

builder.Services.Configure<EmailSettings>(builder.Configuration.GetSection("EmailSettings"));

// Configure CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy", builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseMigrationsEndPoint();
    app.UseCors("CorsPolicy"); // Enable CORS in development environment
}
else
{
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");
app.MapRazorPages();

app.MapFallbackToFile("index.html");

app.Run();
