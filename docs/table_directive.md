# Table directive #

To help with list display this boilerplate comes with a table directive that wraps Smart Table. Directive example can be found in [html/default_list.html](../src/html/default_list.html). Configuration example can be found in [js/controllers/defaultController.js](../src/js/controllers/defaultController.js).

## Including directive in html ##

To include directive in your template enter this line:

    <smart-table config="tableConfig" result="result"></smart-table>
    
Table takes these arguments:

* `config` - Table config object
* `result` - Result returned from endpoint

## Table config ##

Example config:

    $scope.tableConfig = {
        details: $scope.details,
        edit: $scope.edit,
        delete: true,
        deleteCallback: $scope.remove,
        buttons: true,
        showLimit: true,
        showSearch: true,
        responsive: true,
        endpoint: Api.default.list,
        loading: $scope.loading,
        columns: [
            { name: 'id', display: 'ID' },
            { name: 'name', display: 'Vardas' },
            { name: 'surname', display: 'Pavarde' },
            { name: 'sthg', display: 'Something' }
        ]
    }
    
Config parameters:

* `details` - Function that will be called when details button is pressed. First argument is row object. If nothing is passed, table will not display a details button
* `edit` - Function that will be called when edit button is pressed. First argument is row object. If nothing is passed, table will not display an edit button
* `delete` - Function that will be called when edit button is pressed. If this parameter is not a function then default confirmation popup will come up. If this parameter evaluates to false, delete button will not be displayed.
* `deleteCallback` - If delete is not a function but evaluates to true, this function will be called on successful confirmation of default popup
* `buttons` - Boolean if table should display the button column
* `showLimit` - Boolean if table should show limit dropdown
* `limits` - Array of limits to be put inside limit dropdown. Defaults to [5, 10, 25, 100, 250]
* `limit` - Default limit of table results. Defaults to 10
* `showSearch` - Boolean if table should display search box
* `responsive` - Boolean if table should be wrapped inside bootstrap responsive class
* `endpoint` - Promise of result getter function. Works well with [API service](api_service.md)
* `loading` - Exposed loading variable. Used in loading display, such as AdminLTE box loading overlay
* `columns` - Array of table definition objects
    * `name` - Name of variable returned by promise
    * `display` - Text to be displayed as column name

[Back to index](index.md)