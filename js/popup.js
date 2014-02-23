$(document).ready(function()
{
	var $searchbar = $("#searchbar");
	var $searchresults = $("#searchresults");

	// Commented options and (hotkey only) are only possible in dev builds
	var results = {
		"New: New tab": "(Ctrl+T)",
		"New: New window": "(Ctrl+N)",
		"New: New incognito window": "(Ctrl+Shift+N)",
		"Open: Open home page": "(Alt+Home)",
		"Open: Open last tab (hotkey only)": "(Ctrl+Shift+T)",
		//"Open: Open recent tab": "",
		"Open: Open URL": "",
		"Close: Close current tab": "(Ctrl+W)",
		"Close: Close open tab": "",
		"Close: Close window": "(Ctrl+Shift+W)",
		"Close: Exit (hotkey only)": "(Ctrl+Shift+Q)",
		"Switch to tab": "",
		"Reload: Reload page": "(F5)",
		"Reload: Reload page uncached": "(Ctrl+F5)",
		"Bookmarks: Show bookmarks bar (hotkey only)": "(Ctrl+Shift+B)",
		"Bookmarks: Bookmark manager (hotkey only)": "(Ctrl+Shift+O)",
		//"Bookmarks: Import bookmarks and settings": "",
		"Bookmarks: Bookmark this page": "(Ctrl+D)",
		"Bookmarks: Bookmark open pages": "(Ctrl+Shift+D)",
		"Bookmarks: Unbookmark this page": "",
		"File: Save (hotkey only)": "(Ctrl+S)",
		"File: Open (hotkey only)": "(Ctrl+O)",
		"File: Find (hotkey only)": "(Ctrl+F)",
		"File: Print": "(Ctrl+P)",
		"Tools: Task manager (hotkey only)": "(Shift+Esc)",
		"Tools: Clear browsing data": "(Ctrl+Shift+Del)",
		"Tools: Report an issue (hotkey only)": "(Alt+Shift+I)",
		"Tools: View source": "(Ctrl+U)",
		"Tools: Developer tools (hotkey only)": "(Ctrl+Shift+I)",
		"Tools: JavaScript console (hotkey only)": "(Ctrl+Shift+J)",
		"Chrome: Chrome URLs": "",
		"Chrome: Accessibility": "",
		"Chrome: App cache internals": "",
		"Chrome: Apps": "",
		"Chrome: Blob internals": "",
		"Chrome: Bookmarks": "",
		"Chrome: Cache": "",
		"Chrome: About": "",
		"Chrome: Components": "",
		"Chrome: Conflicts": "",
		"Chrome: Crashes": "",
		"Chrome: Credits": "",
		"Chrome: Devices": "",
		"Chrome: DNS": "",
		"Chrome: Downloads": "(Ctrl+J)",
		"Chrome: Extensions": "",
		"Chrome: Flags": "",
		"Chrome: Flash": "",
		"Chrome: GPU": "",
		"Chrome: Help": "",
		"Chrome: Histrograms": "",
		"Chrome: History": "(Ctrl+H)",
		"Chrome: IndexedDB internals": "",
		"Chrome: Inspect": "",
		"Chrome: IPC": "",
		"Chrome: Media internals": "",
		"Chrome: Memory": "",
		"Chrome: Memory internals": "",
		"Chrome: NaCl": "",
		"Chrome: Net internals": "",
		"Chrome: Omnibox": "",
		"Chrome: Plugins": "",
		"Chrome: Policy": "",
		"Chrome: Predictors": "",
		"Chrome: Print": "",
		"Chrome: Profiler": "",
		"Chrome: Quota internals": "",
		"Chrome: Settings": "",
		"Chrome: Sign in internals": "",
		"Chrome: Stats": "",
		"Chrome: Sync internals": "",
		"Chrome: Terms": "",
		"Chrome: Tracing": "",
		"Chrome: Translate internals": "",
		"Chrome: User actions": "",
		"Chrome: Version": "",
		"Chrome: View HTTP cache": "",
		"Chrome: WebRTC internals": "",
		"Chrome: WebRTC logs": "",
		"Debugging: Crash": "",
		"Debugging: Kill": "",
		"Debugging: Hang": "",
		"Debugging: Short hang": "",
		"Debugging: GPU clean": "",
		"Debugging: GPU crash": "",
		"Debugging: GPU hang": "",
		"Debugging: PPAPI flash crash": "",
		"Debugging: PPAPI flash hang": "",
		"Debugging: Restart": ""
	};

	addresults(results);

	var selected = 1;
	var resultlength = Object.keys(results).length;

	$searchbar.on("keydown", function(e)
	{
		switch (e.keyCode)
		{
			case 13:
				var message = $searchresults.children(":nth-child(" + selected + ")").attr("data-content");
				chrome.runtime.sendMessage(message, function()
				{
					window.close();
				});
				return;
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
				$searchresults.append("<div class='result' data-content='" + result + "'>" + divcontents + "</div>");
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
			$searchresults.append("<div class='result' data-content='" + result + "'>" + divcontents + "</div>");
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