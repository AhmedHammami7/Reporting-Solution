using DevExpress.XtraReports.UI;
using Microsoft.AspNetCore.Hosting;
using ReportDesignerServerSide.Data;
using ReportDesignerServerSide.PredefinedReports;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace ReportDesignerServerSide.Services
{
    public class CustomReportStorageWebExtension : DevExpress.XtraReports.Web.Extensions.ReportStorageWebExtension
    {
        protected ReportDbContext DbContext { get; set; }
        public CustomReportStorageWebExtension(ReportDbContext dbContext)
        {
            this.DbContext = dbContext;
        }

        public override bool CanSetData(string url)
        {
            // Determines whether a report with the specified URL can be saved.
            // Add custom logic that returns **false** for reports that should be read-only.
            // Return **true** if no valdation is required.
            // This method is called only for valid URLs (if the **IsValidUrl** method returns **true**).

            return true;
        }

        public override bool IsValidUrl(string url)
        {
            // Determines whether the URL passed to the current report storage is valid.
            // Implement your own logic to prohibit URLs that contain spaces or other specific characters.
            // Return **true** if no validation is required.

            return true;
        }

        public override byte[] GetData(string url)
        {
            // Uses a specified URL to return report layout data stored within a report storage medium.
            // This method is called if the **IsValidUrl** method returns **true**.
            // You can use the **GetData** method to process report parameters sent from the client
            // if the parameters are included in the report URL's query string.
            //var reportsData = DbContext.Reports.ToList();
            var reportData = DbContext.Reports.FirstOrDefault(x => x.Name == url);
            if (reportData != null)
            {
                return reportData.LayoutData;
            }
            else
            {
                using var ms = new MemoryStream();
                using XtraReport report = ReportsFactory.Reports["TestReport"]();
                report.SaveLayoutToXml(ms);
                return ms.ToArray();
            }
            throw new DevExpress.XtraReports.Web.ClientControls.FaultException(
                string.Format("Could not find report '{0}'.", url));
        }

        public override Dictionary<string, string> GetUrls()
        {
            // Returns a dictionary that contains the report names (URLs) and display names. 
            // The Report Designer uses this method to populate the Open Report and Save Report dialogs.

            return DbContext.Reports
                .ToList()
                .Select(x => x.Name)
                .Union(ReportsFactory.Reports.Select(x => x.Key))
                .ToDictionary<string, string>(x => x);
        }

        public override void SetData(XtraReport report, string url)
        {

            // Saves the specified report to the report storage with the specified name
            // (saves existing reports only). 
            using var stream = new MemoryStream(); report.SaveLayoutToXml(stream);
            var reportData = DbContext.Reports.FirstOrDefault(x => x.Name == url);
            if (reportData == null)
            {
                DbContext.Reports.Add(new ReportItem { Name = url, LayoutData = stream.ToArray(),DisplayName = report.DisplayName });
            }
            else
            {
                reportData.LayoutData = stream.ToArray();
            }
            DbContext.SaveChanges();
        }

        public override string SetNewData(XtraReport report, string defaultUrl)
        {
            defaultUrl= Guid.NewGuid().ToString();

            // Allows you to validate and correct the specified name (URL).
            // This method also allows you to return the resulting name (URL),
            // and to save your report to a storage. The method is called only for new reports.
            SetData(report, defaultUrl);
            return defaultUrl;
        }
        /*public IEnumerable<string> GetReportsList()
        {
            var reportNames = DbContext.Reports.Select(r => r.Name);
            var predefinedReportNames = ReportsFactory.Reports.Keys;

            return reportNames.Union(predefinedReportNames);
        }*/
    }
}