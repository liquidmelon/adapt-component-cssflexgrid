<?php

//this PHP script came from this demo: http://www.ravelrumba.com/blog/json-google-spreadsheets/

header('Content-type: application/json');

//get the page number passed in to this script
$feedNum = $_GET['feedNum'];
$allFeeds = array();

// Set all CSV feeds
$allFeeds[0] = 'https://docs.google.com/spreadsheets/d/1XDPyohslGe3bFrLo4U_Rr-muIzRVojnShYmmEKqOqnQ/pub?gid=0&output=csv';

$allFeeds[1] = 'https://docs.google.com/spreadsheets/d/1XDPyohslGe3bFrLo4U_Rr-muIzRVojnShYmmEKqOqnQ/pub?gid=1392773272&output=csv';

$allFeeds[2] = 'https://docs.google.com/spreadsheets/d/1XDPyohslGe3bFrLo4U_Rr-muIzRVojnShYmmEKqOqnQ/pub?gid=1597399408&output=csv';

$allFeeds[3] = 'https://docs.google.com/spreadsheets/d/1XDPyohslGe3bFrLo4U_Rr-muIzRVojnShYmmEKqOqnQ/pub?gid=1676377659&output=csv';

// Set your CSV feed
$feed = $allFeeds[$feedNum];

// Arrays we'll use later
$keys = array();
$newArray = array();

// Function to convert CSV into associative array
function csvToArray($file, $delimiter) {
  if (($handle = fopen($file, 'r')) !== FALSE) {
    $i = 0;
    while (($lineArray = fgetcsv($handle, 4000, $delimiter, '"')) !== FALSE) {
      for ($j = 0; $j < count($lineArray); $j++) {
        $arr[$i][$j] = $lineArray[$j];
      }
      $i++;
    }
    fclose($handle);
  }
  return $arr;
}

// Do it
$data = csvToArray($feed, ',');

// Set number of elements (minus 1 because we shift off the first row)
$count = count($data) - 1;

//Use first row for names
$labels = array_shift($data);

//use this array instead :P
$labels2 = array("columnA","columnB","columnC","columnD","columnE","columnF");

foreach ($labels2 as $label) {
  $keys[] = $label;
}

// Add Ids, just in case we want them later
$keys[] = 'id';

for ($i = 0; $i < $count; $i++) {
  $data[$i][] = $i;
}

// Bring it all together
for ($j = 0; $j < $count; $j++) {
  $d = array_combine($keys, $data[$j]);
  $newArray[$j] = $d;
}

// Print it out as JSON
echo json_encode($newArray);

?>
