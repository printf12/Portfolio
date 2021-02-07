<?php

require 'connect.php';
    
$blogs = [];

$blogsCount = (int)file_get_contents("php://input");

$sql = "SELECT * FROM blogs LIMIT $blogsCount";



if($result = mysqli_query($con,$sql))
{
  $cr = 0;
  while($row = mysqli_fetch_assoc($result))
  {
    $blogs[$cr]['id'] = $row['id'];
    $blogs[$cr]['description'] = $row['description'];
    $blogs[$cr]['image'] = $row['image'];
    $blogs[$cr]['title'] = $row['title'];
    $blogs[$cr]['creationDate'] = $row['creationDate'];
    $blogs[$cr]['blogType'] = $row['blogType'];
    $cr++;
  }
    
  echo json_encode(['data'=>$blogs]);
}
else
{
  http_response_code(404);
}


