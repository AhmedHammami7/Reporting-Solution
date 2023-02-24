using Microsoft.AspNetCore.Mvc;
using System.IO;
using System.Linq;

[ApiController]
[Route("api/files")]
public class FilesController : ControllerBase
{
    [HttpGet]
    public IActionResult GetFilesInFolder(string folderPath)
    {
        if (string.IsNullOrEmpty(folderPath))
        {
            return BadRequest("Folder path is required.");
        }

        var directoryPath = Path.Combine(Directory.GetCurrentDirectory(), folderPath);

        if (!Directory.Exists(directoryPath))
        {
            return BadRequest("Invalid folder path.");
        }

        var fileNames = Directory.GetFiles(directoryPath).Select(Path.GetFileName).ToList();

        return Ok(fileNames);
    }
}
