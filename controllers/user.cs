using System.Collections;
using System.Data;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using MySql.Data.MySqlClient;

[ApiController]
public class UserController:ControllerBase{
    public async Task<IActionResult> Create(User user){
        if(!user.Validate()){
            return BadRequest("Los datos proporcionados no son válidos.");
        }else{
            try{
                MsSQLConnection DB = new MsSQLConnection();
                SqlConnection conn = await DB.Connect();
                string query = "INSERT INTO Users (name, mail, pass) VALUES (@name, @mail, @pass);";
                using (SqlCommand cmd = new SqlCommand(query, conn))
                {
                    cmd.Parameters.AddWithValue("@name", user.Name);
                    cmd.Parameters.AddWithValue("@mail", user.Mail);
                    cmd.Parameters.AddWithValue("@pass", user.Pass);

                    int rowsAffected = await cmd.ExecuteNonQueryAsync();
                    await DB.Disconnect(conn);
                    if (rowsAffected > 0)
                    {
                        return Ok("Usuario ingresado");
                    }
                    else
                    {
                        return StatusCode(500, "Hubo un error al insertar los datos en la base de datos.");
                    }
                }
            }
            catch (System.Exception e){
                Console.WriteLine($"Hubo un error {e.Message}");
                return StatusCode(500, $"Hubo un error: {e.Message}");
                throw;
            }
        }
    }

    public async Task<List<User>> ReadOne(User user){
        //User[] users = new User[0];
        List<User> users = new List<User>();
        try
        {
            MsSQLConnection DB = new MsSQLConnection();
            SqlConnection conn = await DB.Connect();
            string query = "SELECT * FROM Users WHERE mail=@mail;";
            using (SqlCommand cmd = new SqlCommand(query, conn)){
                cmd.Parameters.AddWithValue("@mail", user.Mail);
                using(SqlDataReader reader = cmd.ExecuteReader()){
                    while (reader.Read()){
                        User userI = new User(
                            reader["name"].ToString(),
                            reader["mail"].ToString(),
                            reader["pass"].ToString()
                        );
                        if(userI.Validate()){
                            users.Add(userI);
                        }
                    }
                }
            }
        }
        catch (System.Exception)
        {
            
            throw;
        }
        return users;
    }
}