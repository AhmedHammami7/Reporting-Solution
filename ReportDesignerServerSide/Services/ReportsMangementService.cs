using DevExpress.XtraReports.UI;
using Microsoft.EntityFrameworkCore;
using ReportDesignerServerSide.Data;
using ReportDesignerServerSide.PredefinedReports;
using ReportDesignerServerSide.Reports;

namespace ReportDesignerServerSide.Services
{
    public class ReportsMangementService:IReportsManagementService
    {
        protected ReportDbContext DbContext { get; set; }
        public ReportsMangementService(ReportDbContext dbContext)
        {
            this.DbContext = dbContext;
        }

        public void AddReport(byte [] layoutData, string name, string displayName)
        {
            
            //var existingReport = DbContext.Reports.FirstOrDefault(x => x.Name == name);
            
                // Create a new report item and add it to the DbContext
                var newReport = new ReportItem
                {
                    Name = name,
                    LayoutData = layoutData,
                    DisplayName = displayName // Set the custom display name here
                };
                DbContext.Reports.Add(newReport);
            // Save changes to the DbContext
            DbContext.SaveChanges();
        }

        public IEnumerable<ReportItem> GetReportsList()
        {
            //var reportNames = DbContext.Reports.Select(r => r.Name);
            var reportNames = DbContext.Reports.Select(r => r.Name).ToList();
            var reportItems = DbContext.Reports.ToList();
            //var reportGuids = reportNames.Select(_ => Guid.NewGuid().ToString()).ToList();

            //var reportList = new List<List<string>>();
            //for (int i = 0; i < reportNames.Count; i++)
            //{
            //    reportList.Add(new List<string> {  reportNames[i], reportDisplayNames[i]});
            //}5


            return reportItems;
        }
        public void DeleteReport(string Name)
        {
            var report = DbContext.Reports.FirstOrDefault(r => r.Name == Name);
            if (report != null)
            {
                DbContext.Reports.Remove(report);
                DbContext.SaveChanges();
            }
        }
    }
}
