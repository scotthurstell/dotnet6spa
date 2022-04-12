using Data.Entities;
using Data.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace dotnet6spa.Controllers;

[ApiController]
[Route("[controller]")]
public class WeatherForecastController : ControllerBase
{
    //private static readonly string[] Summaries = new[]
    //{
    //    "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
    //};

    private readonly ILogger<WeatherForecastController> _logger;
    private readonly IForecastRepository _repo;

    public WeatherForecastController(ILogger<WeatherForecastController> logger, IForecastRepository repo)
    {
        _logger = logger;
        _repo = repo;
    }

    //[HttpGet]
    //public IEnumerable<WeatherForecast> Get()
    //{
    //    return Enumerable.Range(1, 5).Select(index => new WeatherForecast
    //    {
    //        Date = DateTime.Now.AddDays(index),
    //        TemperatureC = Random.Shared.Next(-20, 55),
    //        Summary = Summaries[Random.Shared.Next(Summaries.Length)]
    //    })
    //    .ToArray();
    //}

    [HttpGet]
    public async Task<IActionResult> Get() {
        var forecasts = await _repo.GetForecasts();
        return Ok(forecasts);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> Get([FromRoute] int id) {
        var forecast = await _repo.GetForecastById(id);
        return Ok(forecast);
    }

    [HttpPut]
    public async Task UpdateForecast(WeatherForecast forecast) {
        await _repo.UpdateForecast(forecast);
    }

    [HttpPost]
    public async Task CreateForecast(WeatherForecast forecast) { 
        await _repo.CreateForecast(forecast);
    }

    [HttpDelete("{id}")]
    public async Task DeleteForecast([FromRoute] int id) { 
        await _repo.DeleteForecast(new WeatherForecast() { Id = id });
    }

}
