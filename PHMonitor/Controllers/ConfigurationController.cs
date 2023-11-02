using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;

namespace PHMonitor.Controllers
{
    
    [ApiController]
    [Route("api/configuration")]
    public class ConfigurationController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly ILogger<ConfigurationController> _logger;

        public ConfigurationController(IConfiguration configuration, ILogger<ConfigurationController> logger)
        {
            _configuration = configuration ?? throw new ArgumentNullException(nameof(configuration));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));

            ValidateConfiguration();
        }

        private void ValidateConfiguration()
        {
            var requiredSettings = new[] { "Cognito_Domain_Prefix", "AWS_Region", "UserPool_Id", "Client_Id" };
            foreach (var setting in requiredSettings)
            {
                if (string.IsNullOrEmpty(_configuration[setting]))
                {
                    var errorMessage = $"Configuration setting '{setting}' is missing or empty.";
                    _logger.LogError(errorMessage);
                    throw new InvalidOperationException(errorMessage);
                }
            }
        }

        [HttpGet("auth-settings")]
        public ActionResult GetAuthSettings()
        {
            try
            {
                

                var settings = new
                {
                    Authority = $"https://{_configuration["Cognito_Domain_Prefix"]}.auth.{_configuration["AWS_Region"]}.amazoncognito.com",
                    Region = _configuration["AWS_Region"],
                    UserPoolId = _configuration["UserPool_Id"],
                    ClientId = _configuration["Client_Id"],
                    RedirectUri = $"{this.Request.Scheme}://{this.Request.Host}/authentication/login-callback",
                    PostLogoutRedirectUri = $"{this.Request.Scheme}://{this.Request.Host}/authentication/logout-callback",
                    ResponseType = "code",
                    Scope = "openid profile email"
                };

                return Ok(new { settings = settings });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while getting authentication settings.");
                return StatusCode(500, "An internal server error occurred.");
            }
        }

    }
}
