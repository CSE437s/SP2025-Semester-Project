-- Create the stored procedure for table initialization
CREATE OR REPLACE FUNCTION create_stored_procedure(sql text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    EXECUTE sql;
END;
$$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION create_stored_procedure(text) TO authenticated; 