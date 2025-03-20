using System;
using Microsoft.Data.SqlClient;
using System.Threading.Tasks;
using System.Data;

public class MsSQLConnection
{
    private SqlConnection conn = new SqlConnection();

    static public string host = "127.0.0.1";
    static public string port = "1433";
    static public string user = "sa";
    static public string pass = "Passw0rd0";
    static public string db = "TestDB";

    private string ConnectionString = $"Server={host},{port};Database={db};User Id={user};Password={pass};TrustServerCertificate=True;";

    public string Test()
    {
        try
        {
            Console.WriteLine($"\n\nConnectionString = {ConnectionString}\n\n");
            conn.ConnectionString = ConnectionString;
            conn.Open();
            return "Conexión establecida";
        }
        catch (SqlException e)
        {
            return $"Hubo un error en la conexión:\n {e.ToString()}";
        }
    }

    public async Task<SqlConnection> Connect(){
        try{
            if (conn.State == ConnectionState.Open) {
                await conn.CloseAsync();
            }
            conn.ConnectionString = ConnectionString;
            await conn.OpenAsync();
        }catch (SqlException e){
            Console.WriteLine($"Hubo un error en la conexión:\n {e.Message}");
            throw;
        }
        return conn;
    }

    public async Task Disconnect(SqlConnection conn){
        try{
            await conn.CloseAsync();
        }catch (SqlException){
            throw;
        }
    }

    public async Task<DataTable> ExecuteQuery(string query){
        Console.WriteLine(query);
        SqlConnection conn = await this.Connect();
        try{
            SqlCommand cmd = new SqlCommand(query, conn);
            SqlDataAdapter adapter = new SqlDataAdapter(cmd);
            DataTable resultTable = new DataTable();
            adapter.Fill(resultTable);
            return resultTable;
        }catch (Exception ex){
            Console.WriteLine($"Error al ejecutar la consulta: {ex.Message}");
            return new DataTable();
        }finally{
            await this.Disconnect(conn);
        }
    }

    public async Task<int> ExecuteNonQuery(string query)
    {
        SqlConnection conn = await this.Connect();
        try
        {
            SqlCommand cmd = new SqlCommand(query, conn);
            int affectedRows = await cmd.ExecuteNonQueryAsync();
            return affectedRows;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error al ejecutar la consulta: {ex.Message}");
            return -1;
        }
        finally
        {
            await this.Disconnect(conn);
        }
    }
}
