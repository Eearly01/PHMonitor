namespace PHMonitor.Data
{
    using System;
    using System.Text.Json;
    using System.Text.Json.Serialization;

    public class UInt32ArrayConverter : JsonConverter<uint[,]>
    {
        public override uint[,] Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
        {
            // Check if the reader is starting an array
            if (reader.TokenType != JsonTokenType.StartArray)
            {
                throw new JsonException("Expected the start of an array.");
            }

            // Initialize variables to hold the array data
            uint[,] result = null;
            int rows = 0;
            int cols = 0;

            // Read each array element
            while (reader.Read())
            {
                if (reader.TokenType == JsonTokenType.StartArray)
                {
                    // Nested array (sub-array) found
                    int subArrayCols = 0;
                    uint[] subArray = null;

                    while (reader.Read())
                    {
                        if (reader.TokenType == JsonTokenType.Number)
                        {
                            // Read an integer value
                            uint value = reader.GetUInt32();

                            if (subArray == null)
                            {
                                // Initialize the sub-array on first value
                                subArray = new uint[1];
                                subArray[0] = value;
                            }
                            else
                            {
                                // Resize the sub-array and add the value
                                Array.Resize(ref subArray, subArray.Length + 1);
                                subArray[subArray.Length - 1] = value;
                            }

                            subArrayCols++;
                        }
                        else if (reader.TokenType == JsonTokenType.EndArray)
                        {
                            // End of the sub-array
                            if (subArray != null)
                            {
                                if (result == null)
                                {
                                    // Initialize the main array on first sub-array
                                    result = new uint[1, subArrayCols];
                                    for (int i = 0; i < subArray.Length; i++)
                                    {
                                        result[0, i] = subArray[i];
                                    }
                                    cols = subArrayCols;
                                }
                                else
                                {
                                    // Add the sub-array to the main array
                                    int newRows = rows + 1;
                                    int newCols = subArrayCols;

                                    // Resize the main array and copy the sub-array
                                    uint[,] newResult = new uint[newRows, newCols];
                                    for (int i = 0; i < rows; i++)
                                    {
                                        for (int j = 0; j < cols; j++)
                                        {
                                            newResult[i, j] = result[i, j];
                                        }
                                    }

                                    for (int i = 0; i < newCols; i++)
                                    {
                                        newResult[rows, i] = subArray[i];
                                    }

                                    result = newResult;
                                    rows = newRows;
                                    cols = newCols;
                                }
                                subArray = null;
                            }
                            else
                            {
                                throw new JsonException("Expected sub-array values.");
                            }
                        }
                        else
                        {
                            throw new JsonException("Unexpected token within sub-array.");
                        }
                    }
                }
                else if (reader.TokenType == JsonTokenType.EndArray)
                {
                    // End of the main array
                    break;
                }
                else
                {
                    throw new JsonException("Unexpected token within array.");
                }
            }

            // Ensure the reader is positioned on the end of the main array
            if (reader.TokenType != JsonTokenType.EndArray)
            {
                throw new JsonException("Expected the end of the array.");
            }

            return result;
        }

        public override void Write(Utf8JsonWriter writer, uint[,] value, JsonSerializerOptions options)
        {
            writer.WriteStartArray();

            for (int i = 0; i < value.GetLength(0); i++)
            {
                writer.WriteStartArray();

                for (int j = 0; j < value.GetLength(1); j++)
                {
                    writer.WriteNumberValue(value[i, j]);
                }

                writer.WriteEndArray();
            }

            writer.WriteEndArray();
        }
    }

}
