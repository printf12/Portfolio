<?php
/**
 * Returns the list of projects.
 */
require 'connect.php';

$blogId = file_get_contents("php://input");


$comments = [];

$sql = "SELECT * FROM comments where blogID = '$blogId'";

if($result = mysqli_query($con,$sql))
{
  $cr = 0;
  while($row = mysqli_fetch_assoc($result))
  {
    $comments[$cr]['id'] = $row['id'];
    $comments[$cr]['email'] = $row['email'];
    $comments[$cr]['commentText'] = $row['commentText'];
    $comments[$cr]['commentedAt'] = $row['commentedAt'];
    $comments[$cr]['commentedBy'] = $row['commentedBy'];
    $cr++;
  }
    
  echo json_encode(['data'=>$comments]);
  
}
else
{
  http_response_code(404);
}





