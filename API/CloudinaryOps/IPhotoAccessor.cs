using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.CloudinaryOps
{
    public interface IPhotoAccessor
    {
        Task<PhotoUploadResult> AddPhoto(IFormFile file);
        Task<string> DeletePhoto(string publicId);
    }
}