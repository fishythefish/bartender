$(document).ready(function()
{
	var $searchbar = $("#searchbar");
	var $searchresults = $("#searchresults");

	var results = {
		"New: New tab": "(Ctrl+T)",
		"New: New window": "(Ctrl+N)",
		"New: New incognito window": "(Ctrl+Shift+N)",
		"Open: Open home page": "(Alt+Home)",
		"Open: Open last tab": "(Ctrl+Shift+T)",
		"Open: Open recent tab": "",
		"Open: Open URL": "",
		"Close: Close tab": "(Ctrl+W)",
		"Close: Exit": "(Ctrl+Shift+Q)",
		"Switch to tab": "",
		"Reload: Reload page": "(F5)",
		"Reload: Reload page uncached": "(Ctrl+F5)",
		"Bookmarks: Show bookmarks bar": "(Ctrl+Shift+B)",
		"Bookmarks: Bookmark manager": "(Ctrl+Shift+O)",
		"Bookmarks: Import bookmarks and settings": "",
		"Bookmarks: Bookmark this page": "(Ctrl+D)",
		"Bookmarks: Bookmark open pages": "(Ctrl+Shift+D)",
		"Bookmarks: Unbookmark this page": "",
		"File: Save": "(Ctrl+S)",
		"File: Open": "(Ctrl+O)",
		"File: Find": "(Ctrl+F)",
		"File: Print": "(Ctrl+P)",
		"Tools: Extensions": "",
		"Tools: Task manager": "(Shift+Esc)",
		"Tools: Clear browsing data": "(Ctrl+Shift+Del)",
		"Tools: Report an issue": "(Alt+Shift+I)",
		"Tools: View source": "(Ctrl+U)",
		"Tools: Developer tools": "(Ctrl+Shift+I)",
		"Tools: JavaScript console": "(Ctrl+Shift+J)",
		"Tools: Inspect devices": "",
		"Tools: History": "(Ctrl+H)",
		"Tools: Downloads": "(Ctrl+J)",
		"Tools: Settings": "",
		"Tools: About Google Chrome": "",
		"Tools: Help": ""
	};

	addresults(results);

	var selected = 1;
	var resultlength = Object.keys(results).length;

	$searchbar.on("keydown", function(e)
	{
		switch (e.keyCode)
		{
			case 13:
				
			case 38:
				--selected;
				break;
			case 40:
				++selected;
				break;
			default: break;
		}
		selected %= resultlength;
		if (selected <= 0) selected += resultlength;
		sethighlight(selected);
	});

	$searchbar.on("input", function()
	{
		var text = $searchbar.val();

		updateresults(results, text.split(""));
	});

	function updateresults(results, chars)
	{
		$searchresults.empty();
		resultlength = 0;

		if (chars.length === 0)
		{
			addresults(results);
		}
		else
		{
			var patternstring = "";
			for (var i in chars)
			{
				var c = chars[i].replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
				patternstring += "([^" + c + "]*)(" + c + ")";
			}
			patternstring += "(.*)";
			var pattern = new RegExp(patternstring, "i");
			for (var result in results)
			{
				var matches = pattern.exec(result);
				if (!matches) continue;
				++resultlength;
				var divcontents = "<p class='alignleft'>";
				for (var j = 1; j < matches.length - 2; j += 2)
				{
					divcontents += matches[j] + "<span class='match'>" + matches[j + 1] + "</span>";
				}
				divcontents += matches[j];
				divcontents += "</p>";
				if (results[result].length !== 0)
				{
					divcontents += "<p class='alignright'>" + results[result] + "</p>";
				}
				$searchresults.append("<div class='result'>" + divcontents + "</div>");
			}
		}

		if ($searchresults.is(":empty"))
		{
			$searchresults.hide();
		}
		else
		{
			selected = 1;
			sethighlight(selected);
			$searchresults.show();
		}
	}

	function addresults(results)
	{
		resultlength = Object.keys(results).length;
		for (var result in results)
		{
			var divcontents = "<p class='alignleft'>" + result + "</p>";
			if (results[result].length !== 0)
			{
				divcontents += "<p class='alignright'>" + results[result] + "</p>";
			}
			$searchresults.append("<div class='result'>" + divcontents + "</div>");
		}

		if ($searchresults.is(":empty"))
		{
			$searchresults.hide();
		}
		else
		{
			selected = 1;
			sethighlight(selected);
			$searchresults.show();
		}
	}

	function sethighlight(index)
	{
		$searchresults.children().removeClass("highlight");
		$searchresults.children(":nth-child(" + index + ")").addClass("highlight");

		var scrollpos = (selected - 1) * 34;
		window.scrollTo(0, scrollpos);
	}
});