$(document).ready(function()
{
	var $searchbar = $("#searchbar");
	var $searchresults = $("#searchresults");

	var results = ['alpha', 'beta', 'gamma', 'delta', 'epsilon', 'zeta', 'eta',
		'theta', 'iota', 'kappa', 'lambda', 'mu', 'nu', 'xi', 'omicron', 'pi',
		'rho', 'sigma', 'tau', 'upsilon', 'phi', 'chi', 'psi', 'omega'];

	updateresults(results, "");

	$searchbar.on("input", function()
	{
		var text = $searchbar.val();

		/*function validate(value, index, array)
		{
			var pattern = /[\w ():-]/gi;
			var check = pattern.test(value);
			return check;
		}

		var text = $searchbar.val();
		var filtered = [].filter.call(text, validate).join("");
		$searchbar.val(filtered);*/
		updateresults(results, text.split(""));
	});

	function updateresults(results, chars)
	{
		$searchresults.empty();

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
			for (var i in results)
			{
				var result = results[i];
				var matches = pattern.exec(result);
				if (!matches) continue;
				var divcontents = "";
				for (var j = 1; j < matches.length - 2; j += 2)
				{
					divcontents += matches[j] + "<span class='match'>" + matches[j + 1] + "</span>";
				}
				divcontents += matches[j];
				$searchresults.append("<div class='result'>" + divcontents + "</div>");
			}
		}

		if ($searchresults.is(":empty"))
		{
			$searchresults.hide();
		}
		else
		{
			$searchresults.show();
		}
	}

	function addresults(results)
	{
		for (var i in results)
		{
			var result = results[i];
			$searchresults.append("<div class='result'>" + result + "</div>");
		}
	}
});