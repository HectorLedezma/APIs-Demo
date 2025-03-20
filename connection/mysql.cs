using MySql.Data.MySqlClient;

public class MySQLConnection(){
    MySqlConnection conn = new MySqlConnection();

    static public string host = "localhost";
    static public string port = "3306";
    static public string user = "root";
    static public string pass = "sOaFTFv_lTC.VTqS";
    static public string db = "test02";

    string ConnectionString = $"server={host};port={port};user id={user};password={pass};database={db};";

    
    public string Test(){
        try
        {   
            Console.WriteLine($"\n\nConnectionString = {ConnectionString}\n\n");
            conn.ConnectionString = ConnectionString;
            conn.Open();
            return "Conexion establesida";
            
        }
        catch (MySqlException e)
        {
            return $"Hubo en erro en la conexion:\n {e.ToString()}";
        }
    }


    public MySqlConnection Connect(){
        try
        {
            conn.ConnectionString = ConnectionString;
            conn.OpenAsync();
        }
        catch (MySqlException e)
        {
            Console.WriteLine($"Hubo en erro en la conexion:\n {e.ToString()}");
            throw;
        }
        return conn;
    }

    public void Disconnect(MySqlConnection conn){
        try
        {
            conn.CloseAsync();
        }
        catch (MySqlException)
        {
            throw;
        }
    }

       
}