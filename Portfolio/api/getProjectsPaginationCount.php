<?php
/**
 * Returns the list of projects.
 */
require 'connect.php';

$sql="select count(*) as total from projects";
$result=mysqli_query($con,$sql);
$data=mysqli_fetch_assoc($result);
echo $data['total'];
    
    





