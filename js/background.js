chrome.runtime.onMessage.addListener(function(message, sender, sendResponse)
{
	// Unimplemented cases correspond to dev-only features
	switch (message)
	{
		case "New: New tab":
			chrome.tabs.create({"url": "chrome://newtab"});
			break;
		case "New: New window":
			chrome.windows.create();
			break;
		case "New: New incognito window":
			chrome.windows.create({"incognito": true});
			break;
		case "Open: Open home page":
			chrome.tabs.create({});
			break;
		case "Open: Open last tab":
			// Dev only
			break;
		case "Open: Open recent tab":
			// Dev only
			break;
		case "Open: Open URL":
			// TODO
			break;
		case "Close: Close current tab":
			chrome.tabs.query(
				{
					"active": true,
					"currentWindow": true
				},
				function(tabs)
				{
					for (i in tabs)
					{
						var tab = tabs[i];
						chrome.tabs.remove(tab.id);
					}
				}
			);
			break;
		case "Close: Close open tab":
			// TODO
			break;
		case "Close: Close window":
			chrome.windows.getCurrent(function(window)
			{
				chrome.windows.remove(window.id);
			});
			break;
		case "Close: Exit":
			// Dev only
			break;
		case "Switch to tab":
			// TODO
			break;
		case "Reload: Reload page":
			chrome.tabs.reload();
			break;
		case "Reload: Reload page uncached":
			chrome.tabs.reload({"bypassCache": true});
			break;
		case "Bookmarks: Show bookmarks bar":
			// Dev only
			break;
		case "Bookmarks: Bookmark manager":
			// Dev only
			break;
		case "Bookmarks: Import bookmarks and settings":
			// Dev only
			break;
		case "Bookmarks: Bookmark this page":
			// TODO
			break;
		case "Bookmarks: Bookmark open pages":
			// TODO
			break;
		case "Bookmarks: Unbookmark this page":
			// TODO
			break;
		case "File: Save":
			// Dev only
			break;
		case "File: Open":
			// Dev only
			break;
		case "File: Find":
			// Dev only
			break;
		case "File: Print":
			chrome.tabs.executeScript({"code": "window.print();"});
			break;
		case "Tools: Task manager":
			// Dev only
			break;
		case "Tools: Clear browsing data":
			// TODO
			break;
		case "Tools: Report an issue":
			// Dev only
			break;
		case "Tools: View source":
			chrome.tabs.query(
				{
					"active": true,
					"currentWindow": true
				},
				function(tabs)
				{
					for (i in tabs)
					{
						var tab = tabs[i];
						chrome.tabs.create({"url": "view-source:" + tab.url});
					}
				}
			);
			break;
		case "Tools: Developer tools":
			// Dev only
			break;
		case "Tools: JavaScript console":
			// Dev only
			break;
		case "Chrome: Chrome URLs":
			chrome.tabs.create({"url": "chrome://chrome-urls/"});
			break;
		case "Chrome: Accessibility":
			chrome.tabs.create({"url": "chrome://accessibility"});
			break;
		case "Chrome: App cache internals":
			chrome.tabs.create({"url": "chrome://appcache-internals"});
			break;
		case "Chrome: Apps":
			chrome.tabs.create({"url": "chrome://apps"});
			break;
		case "Chrome: Blob internals":
			chrome.tabs.create({"url": "chrome://blob-internals"});
			break;
		case "Chrome: Bookmarks":
			chrome.tabs.create({"url": "chrome://bookmarks"});
			break;
		case "Chrome: Cache":
			chrome.tabs.create({"url": "chrome://cache"});
			break;
		case "Chrome: About":
			chrome.tabs.create({"url": "chrome://chrome"});
			break;
		case "Chrome: Components":
			chrome.tabs.create({"url": "chrome://components"});
			break;
		case "Chrome: Conflicts":
			chrome.tabs.create({"url": "chrome://conflicts"});
			break;
		case "Chrome: Crashes":
			chrome.tabs.create({"url": "chrome://crashes"});
			break;
		case "Chrome: Credits":
			chrome.tabs.create({"url": "chrome://credits"});
			break;
		case "Chrome: Devices":
			chrome.tabs.create({"url": "chrome://devices"});
			break;
		case "Chrome: DNS":
			chrome.tabs.create({"url": "chrome://dns"});
			break;
		case "Chrome: Downloads":
			chrome.tabs.create({"url": "chrome://downloads"});
			break;
		case "Chrome: Extensions":
			chrome.tabs.create({"url": "chrome://extensions"});
			break;
		case "Chrome: Flags":
			chrome.tabs.create({"url": "chrome://flags"});
			break;
		case "Chrome: Flash":
			chrome.tabs.create({"url": "chrome://flash"});
			break;
		case "Chrome: GPU":
			chrome.tabs.create({"url": "chrome://gpu"});
			break;
		case "Chrome: Help":
			chrome.tabs.create({"url": "chrome://help"});
			break;
		case "Chrome: Histrograms":
			chrome.tabs.create({"url": "chrome://histograms"});
			break;
		case "Chrome: History":
			chrome.tabs.create({"url": "chrome://history"});
			break;
		case "Chrome: IndexedDB internals":
			chrome.tabs.create({"url": "chrome://indexeddb-internals"});
			break;
		case "Chrome: Inspect":
			chrome.tabs.create({"url": "chrome://inspect"});
			break;
		case "Chrome: IPC":
			chrome.tabs.create({"url": "chrome://ipc"});
			break;
		case "Chrome: Media internals":
			chrome.tabs.create({"url": "chrome://media-internals"});
			break;
		case "Chrome: Memory":
			chrome.tabs.create({"url": "chrome://memory"});
			break;
		case "Chrome: Memory internals":
			chrome.tabs.create({"url": "chrome://memory-internals"});
			break;
		case "Chrome: NaCl":
			chrome.tabs.create({"url": "chrome://nacl"});
			break;
		case "Chrome: Net internals":
			chrome.tabs.create({"url": "chrome://net-internals"});
			break;
		case "Chrome: Omnibox":
			chrome.tabs.create({"url": "chrome://omnibox"});
			break;
		case "Chrome: Plugins":
			chrome.tabs.create({"url": "chrome://plugins"});
			break;
		case "Chrome: Policy":
			chrome.tabs.create({"url": "chrome://policy"});
			break;
		case "Chrome: Predictors":
			chrome.tabs.create({"url": "chrome://predictors"});
			break;
		case "Chrome: Print":
			chrome.tabs.create({"url": "chrome://print"});
			break;
		case "Chrome: Profiler":
			chrome.tabs.create({"url": "chrome://profiler"});
			break;
		case "Chrome: Quota internals":
			chrome.tabs.create({"url": "chrome://quota-internals"});
			break;
		case "Chrome: Settings":
			chrome.tabs.create({"url": "chrome://settings"});
			break;
		case "Chrome: Sign in internals":
			chrome.tabs.create({"url": "chrome://signin-internals"});
			break;
		case "Chrome: Stats":
			chrome.tabs.create({"url": "chrome://stats"});
			break;
		case "Chrome: Sync internals":
			chrome.tabs.create({"url": "chrome://sync-internals"});
			break;
		case "Chrome: Terms":
			chrome.tabs.create({"url": "chrome://terms"});
			break;
		case "Chrome: Tracing":
			chrome.tabs.create({"url": "chrome://tracing"});
			break;
		case "Chrome: Translate internals":
			chrome.tabs.create({"url": "chrome://translate-internals"});
			break;
		case "Chrome: User actions":
			chrome.tabs.create({"url": "chrome://user-actions"});
			break;
		case "Chrome: Version":
			chrome.tabs.create({"url": "chrome://version"});
			break;
		case "Chrome: View HTTP cache":
			chrome.tabs.create({"url": "chrome://view-http-cache"});
			break;
		case "Chrome: WebRTC internals":
			chrome.tabs.create({"url": "chrome://webrtc-internals"});
			break;
		case "Chrome: WebRTC logs":
			chrome.tabs.create({"url": "chrome://webrtc-logs"});
			break;
		case "Debugging: Crash":
			chrome.tabs.create({"url": "chrome://crash"});
			break;
		case "Debugging: Kill":
			chrome.tabs.create({"url": "chrome://kill"});
			break;
		case "Debugging: Hang":
			chrome.tabs.create({"url": "chrome://hang"});
			break;
		case "Debugging: Short hang":
			chrome.tabs.create({"url": "chrome://shorthang"});
			break;
		case "Debugging: GPU clean":
			chrome.tabs.create({"url": "chrome://gpuclean"});
			break;
		case "Debugging: GPU crash":
			chrome.tabs.create({"url": "chrome://gpucrash"});
			break;
		case "Debugging: GPU hang":
			chrome.tabs.create({"url": "chrome://gpuhang"});
			break;
		case "Debugging: PPAPI flash crash":
			chrome.tabs.create({"url": "chrome://ppapiflashcrash"});
			break;
		case "Debugging: PPAPI flash hang":
			chrome.tabs.create({"url": "chrome://ppapiflashhang"});
			break;
		case "Debugging: Restart":
			chrome.tabs.create({"url": "chrome://restart/"});
		default: break;
	}

	sendResponse("done");
});