# Structure #

## Root structure ##

* `bower_components` - Bower frontend dependencies. *Not included in git, will be downloaded*
* `dist` - Actual contents you will be moving to your server. *Not included in git, will be generated*
* `docs` - This documentation
* `node_modules` - Node dependencies for gulp builder. *Not included in git, will be downloaded*
* `src` - Actual source files you will be editing

## Source structure ##

Source files are located inside [src](../src) folder

* `html` - AngularJS templates that will be added to cache
    * `root.html` - Main template that will be inserted between body tags. This holds your sidebar and header bar
    * `sidebar.html` - Sidebar on the left
    * `header.html` - Top bar
    * `message_modal.html` - A general modal that will be used for popup messages, prompts and confirmations
    * `list_table.html` - Template for list directive
    * `login.html` - A login template that will be used instead of root.html when logging in
    * `components.html` - A list of more interesting components used in the boilerplate with examples
    * `default_list.html` - A default list example depicting the usage of list directive
    * `default_edit.html` - A default edit/add form
* `js` - This is where javascript sources live
    * `controllers` - This is where you will put your controllers. Controllers should be separated logically for each action
        * `mainController.js` - This controller wraps the whole app. It includes message modal controller and other shared component controllers such as alerts. It also bind shared functions to root scope
        * `defaultController.js` - An example controller.
    * `directives` - This is where you will place your directives
        * `icheckDirective.js` - A convenience directive to bind checkboxes and radio buttons to that nice looking iCheck
        * `smartTableDirective.js` - A pretty smart directive that takes the table config and draws a nice looking table. You can read more about it [here](table_directive.md)
    * `services` - This is where you will place your services
        * `apiService.js` - A convenience service that handles communication with API and some persistence. You can read more about it [here](api_service.js)
    * `app.js` - Main module definition including config and run functions
* `less` - Less files for styling. We use less, because bootstrap uses less
* `index.html` - Actual index.html with all injection tags.

## State structure ##

This boilerplate includes [ui-router](https://github.com/angular-ui/ui-router) as a default router mainly due to its view nesting capability.

The states are structures as follows:

* `root` - Abstract state that is the parent of all dashboard states. Puts main view, sidebar view and top bar
    * `default` - Abstract example state that would be one logical component of your app (such as users, events, items)
        * `default.list` - A list state with the table
        * `default.add` - Create new something
        * `default.edit` - Edit something
    * `components` - Example components
* `login` - A state that replaces root when login needs to be shown

[Back to index](index.md)