using System;
using System.Net;
using System.Net.Mail;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using PHMonitor.Data;

namespace PHMonitor.Controllers
{
    [Route("api/send-email")]
    [ApiController]
    public class SendEmailController : ControllerBase
    {
        private readonly EmailSettings _emailSettings;

        public SendEmailController(IOptions<EmailSettings> emailSettings)
        {
            _emailSettings = emailSettings.Value;
        }

        [HttpPost]
        public IActionResult SendEmail([FromBody] EmailRequest request)
        {
            try
            {
                var smtpClient = new SmtpClient(_emailSettings.MailServer)
                {
                    Port = _emailSettings.MailPort,
                    Credentials = new NetworkCredential(_emailSettings.Username, _emailSettings.Password),
                    EnableSsl = true,
                };

                var mailMessage = new MailMessage
                {
                    From = new MailAddress(_emailSettings.SenderEmail, _emailSettings.SenderName),
                    Subject = request.Subject,
                    Body = $"From: {request.Name} ({request.Email})\n\n{request.Message}",
                    IsBodyHtml = false,
                };

                mailMessage.To.Add(_emailSettings.SenderEmail);

                smtpClient.Send(mailMessage);

                return Ok();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return StatusCode(500, "Internal server error");
            }
        }
    }

    public class EmailRequest
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string? Subject { get; set; }
        public string Message { get; set; }
    }
}
