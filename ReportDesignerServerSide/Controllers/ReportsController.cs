using DevExpress.XtraPrinting.Native.LayoutAdjustment;
using DevExpress.XtraReports.UI;
using DevExpress.XtraReports.Web.Extensions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using ReportDesignerServerSide.Models;
using ReportDesignerServerSide.Reports;
using ReportDesignerServerSide.Services;

namespace ReportDesignerServerSide.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReportsController : ControllerBase
    {
        private readonly IReportsManagementService reportStorage;

        public ReportsController(IReportsManagementService reportStorage)
        {
            this.reportStorage = reportStorage;
        }
        [HttpPost]
        public ActionResult AddReport([FromBody] JObject json)
        {
            Random rnd = new Random();
            // Get the report layout data and other information from the form data
            XtraReport report = new XtraReport1();
            using var stream = new MemoryStream(); report.SaveLayoutToXml(stream);
            var name = Guid.NewGuid().ToString();
            var displayName = json["displayName"].ToString();

            // Generate a new ID for the report
            var layoutData = stream.ToArray();
            // Add the new report to the report storage
            reportStorage.AddReport(layoutData, name, displayName);

            // Return a success message
            return Ok("Report added successfully.");
        }
        [HttpGet]
        public ActionResult<List<Models.ReportItemDTO>> Get() { 

            List<ReportItemDTO> result =new List<ReportItemDTO>();

          var  resultx = reportStorage.GetReportsList().Select(x =>
            {
                return new ReportItemDTO
                {
                    Name = x.Name,
                    DisplayName = x.DisplayName,
                };
            }).ToList();
        
            return resultx ;
        }
        [HttpDelete("{reportName}")]
        public ActionResult Delete(string reportName)
        {
            reportStorage.DeleteReport(reportName);
            return Ok("Report deleted successfully.");
        }
    }
}
