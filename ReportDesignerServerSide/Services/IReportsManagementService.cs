using ReportDesignerServerSide.Data;
using System.Collections;

namespace ReportDesignerServerSide
{
    public interface IReportsManagementService
    {
        public void AddReport( byte[] layoutData, string name, string displayName);
        public IEnumerable<ReportItem> GetReportsList();
        public void DeleteReport(string Name);


    }
}