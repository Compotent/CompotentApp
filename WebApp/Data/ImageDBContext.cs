using Microsoft.EntityFrameworkCore;


namespace WebApp.Data
{
    public class ImageDBContext : DbContext
    {
        public ImageDBContext(DbContextOptions<ImageDBContext> options) : base(options)
        {
            Database.EnsureCreated();

        }

        DbSet<SettingData> imageData { get; set; }

        //protected override void OnModelCreating(ModelBuilder modelBuilder)
        //{
        //    modelBuilder.Entity<SettingData>(eb => eb.HasNoKey();
        //}
    }
}
