<?php
require 'connect.php';

// Get the posted data.
$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata))
{
  // Extract the data.
  $request = json_decode($postdata);

  $id = mysqli_real_escape_string($con, (int)$request->id);
  $image = mysqli_real_escape_string($con, trim($request->image));
  $title  = mysqli_real_escape_string($con, trim($request->title));
  $description  = mysqli_real_escape_string($con, trim($request->description));
  $creationDate  = mysqli_real_escape_string($con, trim($request->creationDate));

 $sql = "UPDATE projects SET titel='$title', description='$description', image='$image',creationDate='$creationDate' WHERE id= $id";
  
  if(mysqli_query($con, $sql))
  {
    http_response_code(204);
    $project = [
      'image' => $image,
      'description' => $description,
      'creationDate' => $creationDate,
      'title' => $title,
      'id'    => mysqli_insert_id($con)
    ];
    echo json_encode($project);
  }
  else
  {
      echo("error");
    return http_response_code(422);
  }  
}




