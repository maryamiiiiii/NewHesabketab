sdafasdfasdfasdf<?php
include_once('../../mainfile.php');

if (isset($_POST['costan']))
{
$ostan = $_POST['costan'];
$city = $_POST['city'];


    $qmenu = mysql_query("SELECT * FROM nuke_book_shahr where ostan = $ostan order by id");
          $optinons .= "<option value=0 >همه موارد</option>";
         while($rowdetail = mysql_fetch_array($qmenu))
         {          		   
           if ($city == $rowdetail['shahr'])
		    $sel = "selected";
		    else
			$sel = "";	
			
          $optinons .= "<option value=".$rowdetail['shahr']." $sel>".$rowdetail['title']."</option>";
         }

    echo  $optinons;
   
}
?>
