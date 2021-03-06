# adapt-component-cssflexgrid

**CSS Flex Grid** is a *presentation component* for the [Adapt framework](https://github.com/adaptlearning/adapt_framework) that displays json-formatted data in a css flexbox.

**CSS Flex Grid** is based on [adaptlearning's text component](https://github.com/adaptlearning/adapt-contrib-text) and incorporates modern styling techniques along with data collection from an external source.



## Screenshot

![cssflexgridss](https://cloud.githubusercontent.com/assets/24887794/23383556/e50be408-fcfb-11e6-82ff-d564a72f54bf.png)



## Notes

this plugin demonstrates how to create a grid with a css flexbox and fill it with data from a public google doc.* data can also be loaded from a local json file. the data is passed into a separate template and rendered in it’s own view, which is then rendered in the component’s view. an svg icon is used as a clickable link.

to get data from the online google doc, set the data source to “remote”, but you’ll have to run it off of a web server because the php won’t run in the AT. set the data source to “local” (which is default) when running it in the AT, and it’ll grab data from the included json files.

also note that this plugin is more for reference than for production. it is suggested to make a fork to support your own scenario.

*[example document](https://docs.google.com/spreadsheets/d/1XDPyohslGe3bFrLo4U_Rr-muIzRVojnShYmmEKqOqnQ/edit#gid=102731156) courtesy of Helen Maffin



## Things learned while making this component

fetching a collection from external data

defining a model for the collection

resetting the collection’s data

modifying a collection’s model and the data in the model

setting properties on the component’s model

defining and using a separate template

passing data to each of the templates

adding/removing views

including extra assets



## Possibilities

scale up or down (more/less flexboxes)

change the flexbox design (using templates and css)

create alternate templates and use as a tabbed component

and in theory, the logic involved could probably be expanded to populate an entire course with external data :P



## Reference Links

[flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)

[flexbox truncated text](https://css-tricks.com/flexbox-truncated-text/)

[getting json out of google spreadsheets](http://www.ravelrumba.com/blog/json-google-spreadsheets/)



## Limitations

not known at this time



----------------------------
**Version number:** 0.0.1.1<br>
**Framework versions:** ^2.0.0
