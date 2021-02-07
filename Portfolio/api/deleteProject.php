<?php

require 'connect.php';

$postdata = file_get_contents("php://input");

$id = json_decode($postdata);

// Delete.
$sql = "DELETE FROM projects WHERE id= $id";

if(mysqli_query($con, $sql))
{
  http_response_code(204);
}
else
{
  return http_response_code(422);
}