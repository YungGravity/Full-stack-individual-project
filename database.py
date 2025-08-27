import psycopg
import config
def connect_to_database():
    try:
        connection = psycopg.connect(config.db_connection)
        return connection
    except psycopg.Error as error:
        print("Error connecting to the database:", error)
        return None

def execute_sqL_query(sql_query, query_parameters=None):
    connection = connect_to_database()
    if not connection:
        return "Connection error"
    result = None
    try:
        cursor = connection.cursor()
        cursor.execute(sql_query, query_parameters)

        if sql_query.strip().upper().startswith("SELECT"):
            # Execute SELECT queries for GET requests
            result = cursor.fetchall()
        else:
            # Execute non-SELECT queries
            connection.commit()
            result = True
        cursor.close()
    except psycopg.Error as exception:
        print("Error executing SQL query:", exception)
        result = exception
    finally:
        connection.close()

        return result