using DevExpress.AspNetCore;
using DevExpress.XtraReports.Web.Extensions;
using DevExpress.AspNetCore.Reporting;
using ReportDesignerServerSide.Services;
using Microsoft.OpenApi.Models;
using DevExpress.XtraCharts;
using ReportDesignerServerSide.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Register reporting services in an application's dependency injection container.
builder.Services.AddDevExpressControls();

builder.Services.AddCors(options => {
    options.AddPolicy("AllowCorsPolicy", builder => {
        // Allow all ports on local host.
        builder.SetIsOriginAllowed(origin => new Uri(origin).Host == "localhost");
        builder.AllowAnyHeader();
        builder.AllowAnyMethod();
    });
});
// Use the AddMvcCore (or AddMvc) method to add MVC services.
builder.Services.AddMvc().ConfigureApplicationPartManager(x => {
    var parts = x.ApplicationParts;
    var aspNetCoreReportingAssemblyName = typeof(DevExpress.AspNetCore.Reporting.WebDocumentViewer.WebDocumentViewerController).Assembly.GetName().Name;
    var reportingPart = parts.FirstOrDefault(part => part.Name == aspNetCoreReportingAssemblyName);
    if (reportingPart != null)
    {
        parts.Remove(reportingPart);
    }
    //This part is not required 
    //var assembly = typeof(EdvinController).Assembly;
    //var part = new AssemblyPart(assembly);
    //parts.Add(part);
});
builder.Services.AddControllers().AddNewtonsoftJson();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo{ Title="MyAPI",Version="v1"});
});
builder.Services.AddScoped<ReportStorageWebExtension, CustomReportStorageWebExtension>();
//var ConnectionStringSettings = "Data Source=Application.db;Cache=Shared";
builder.Services.AddDbContext<ReportDbContext>(options => options.UseSqlite("Data Source=./Data/reportsData.db"));
// Add services to the container.
builder.Services.AddControllersWithViews();

var app = builder.Build();
// Initialize reporting services.
app.UseDevExpressControls();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();


app.UseCors("AllowCorsPolicy");
app.UseEndpoints(endpoints =>
{
    endpoints.MapControllerRoute(
        name: "default",
        pattern: "{controller=Home}/{action=Index}/{id?}");
});
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(options =>
    {
        options.SwaggerEndpoint("/swagger/v1/swagger.json", "v1");
        
    });
}
//app.UseAuthorization();
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
