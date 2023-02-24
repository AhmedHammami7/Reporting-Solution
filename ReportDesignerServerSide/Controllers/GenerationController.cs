using DevExpress.XtraPrinting;
using DevExpress.XtraReports.UI;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReportDesignerServerSide.Reports;

namespace ReportDesignerServerSide.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GenerationController : ControllerBase
    {
        [HttpGet("[action]")]
        public async Task<object> Print()
        {
            var report = new test();
            using (var ms = new MemoryStream())
            {
                await report.ExportToPdfAsync(ms, new DevExpress.XtraPrinting.PdfExportOptions { ShowPrintDialogOnOpen = true });
                return File(ms.ToArray(), System.Net.Mime.MediaTypeNames.Application.Pdf);
            }
        }
        [HttpGet("[action]")]
        public ActionResult Export(string format = "pdf")
        {
            format = format.ToLower();
            XtraReport report = new test();
            string contentType = string.Format("application/{0}", format);
            using (MemoryStream ms = new MemoryStream())
                    
            {
                switch (format)
                {
                    case "pdf":
                        contentType = "application/pdf";
                        report.ExportToPdf(ms);
                        break;
                    case "docx":
                        contentType = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
                        report.ExportToDocx(ms);
                        break;
                    case "xls":
                        contentType = "application/vnd.ms-excel";
                        report.ExportToXls(ms);
                        break;
                    case "xlsx":
                        contentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
                        report.ExportToXlsx(ms);
                        break;
                    case "rtf":
                        report.ExportToRtf(ms);
                        break;
                    case "mht":
                        contentType = "message/rfc822";
                        report.ExportToMht(ms);
                        break;
                    case "html":
                        contentType = "text/html";
                        report.ExportToHtml(ms);
                        break;
                    case "txt":
                        contentType = "text/plain";
                        report.ExportToText(ms);
                        break;
                    case "csv":
                        contentType = "text/plain";
                        report.ExportToCsv(ms);
                        break;
                    case "png":
                        contentType = "image/png";
                        report.ExportToImage(ms, new ImageExportOptions() { Format = System.Drawing.Imaging.ImageFormat.Png });
                        break;
                }
                return File(ms.ToArray(), contentType);
            }
        }

    }
}
