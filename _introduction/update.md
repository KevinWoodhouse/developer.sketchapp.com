---
title: Updating Plugins
summary: How to setup a plugin to be updated by Sketch
permalink: /introduction/updating-plugins/
order: 150
---

From Sketch v45 onwards Sketch provides an officially supported mechanism for updating plugins within the app.

If your plugin already has its own update mechanism built into it, we encourage that you move to using the new system. This will improve the user experience, since users will be able to manage all installed plugins inside a tab in the app’s Preferences panel.

On launch, we check for updates for all installed plugins, and if there’s any, we show a badge on Sketch’s window. Clicking it will take the user to the app’s Preferences, where they’ll be able to update their plugins.

## How to setup a plugin to be updated by Sketch

There is an additional entry in the `manifest.json` file contained within your plugin bundle that you need to define for updating to work.

The entry is called `appcastURL`, and it is a string specifying a URL to the appcast file. The appcast file contains information about updates to the plugin, like the versions of available updates and where the updates can be downloaded from. Sketch downloads this file to determine if there are plugin updates available. For more details about the appcast format, see [plugin bundles](/introduction/plugin-bundles/#appcast-url).

Currently Sketch only allows the user to update to the latest version. Future versions of Sketch may provide additional options for the user to select which plugin version can be downloaded and installed.

#### How to be a good citizen of the Sketch developer plugin community

##### Implementing the Startup and Shutdown methods in your Plugin

If your plugin does anything that requires some initialization you should implement the `Startup` handler as part of your plugin. The same goes for implementing the `Shutdown` handler, where you should implement any cleanup code that your plugin requires.
You may have already been using these events, but with plugin updating it is more important than ever to do so.

When a plugin is updated, the version being updated will be sent the `Shutdown` action. And the new version will be sent a `Startup` action.

For example, if your plugin displays some user interface elements within Sketch, you should remove those in the `Shutdown` handler. This way, the new plugin will be able to show the updated user interface components with all of the old user interface elements having been removed.

The same goes for any persistent data that your plugin maintains. Any unsaved information should be written to disk when `Shutdown` is called.

Do not include code in the `Startup` handler that could be run later.


### The Appcast

The Appcast conforms to the Sparkle defined appcast described in the [Sparkle Documentation](https://sparkle-project.org/documentation/) and on the [Publishing an Update page](https://sparkle-project.org/documentation/publishing/#publishing-an-update). For Sketch plugins, only .zip files are supported as enclosures.

The minimum and maximum system version do not refer to the version of the operating system when used for plugins. Exactly how they will be used in a later version of Sketch is still undecided.

The following Appcast example lists three different versions of the plugin. Each version has its own download link and brief description text.

```xml
<?xml version="1.0" encoding="utf-8"?>
<rss version="2.0" xmlns:sparkle="http://www.andymatuschak.org/xml-namespaces/sparkle"  xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>Hello World Sketch Test Plugin</title>
    <link>http://sparkle-project.org/files/sparkletestcast.xml</link>
    <description>Brilliant Hello World Plugin</description>
    <language>en</language>
      <item>
        <title>Version 1.1</title>
        <description>
          <![CDATA[
            <ul>
              <li>Minor update v1.1</li>
            </ul>
          ]]>
        </description>
        <pubDate>Fri, 03 Mar 2017 11:49:11 +0000</pubDate>
        <enclosure url="https://brillianthello.sketchplugins.com/files/HelloWorldSketchPluginTestv11.zip" sparkle:version="1.1" length="107758" type="application/octet-stream" />
      </item>
      <item>
        <title>Version 1.2</title>
        <description>
          <![CDATA[
            <ul>
            <li>Minor update v1.2</li>
            </ul>
          ]]>
        </description>
        <pubDate>Fri, 03 Mar 2017 11:53:00 +0000</pubDate>
        <enclosure url="https://brillianthello.sketchplugins.com/files/HelloWorldSketchPluginTestv12.zip" sparkle:version="1.2" length="107821" type="application/octet-stream" />
      </item>
      <item>
        <title>Version 2.0</title>
        <description>
          <![CDATA[
            <ul>
            <li>Major update v2.0</li>
            </ul>
          ]]>
        </description>
        <pubDate>Fri, 03 Mar 2017 11:58:00 +0000</pubDate>
        <enclosure url="https://brillianthello.sketchplugins.com/files/HelloWorldSketchPluginTestv20.zip" sparkle:version="2.0" length="111042" type="application/octet-stream" />
      </item>
  </channel>
</rss>
```
