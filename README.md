<h1 id="synergykit-javascript-sdk">SynergyKit JavaScript SDK</h1>

<p align="left">
<img src="https://synergykit.blob.core.windows.net/synergykit/synergykitlogo.png" alt="Synergykit" title="Synergykit" width="33%">
</p>

<p>Backend as a Service SynergyKit for <strong>fast and simple mobile/web/desktop applications development</strong>. SynergyKit allows enterpreneurs implement an idea to project fast and low cost like Lean Startup, validates and runs product.</p>

<p>We know how hard can be to work with untried API, so we prepared SDKs for mostly used platforms.</p>

<p><strong>Another SDKs</strong></p>

<ul>
<li><a href="https://github.com/SynergyKit/synergykit-sdk-android">Android SDK</a></li>
<li><a href="https://github.com/SynergyKit/synergykit-sdk-ios">iOS SDK</a></li>
<li><a href="https://github.com/SynergyKit/synergykit-sdk-nodejs">Node.js SDK</a></li>
</ul>

<p><strong>Table of content</strong></p>

<p><div class="toc">
<ul>
<li><a href="#synergykit-javascript-sdk">SynergyKit JavaScript SDK</a><ul>
<li><a href="#synergykit-initialization">SynergyKit Initialization</a></li>
<li><a href="#documents">Documents</a><ul>
<li><a href="#create-new-document">Create new document</a></li>
<li><a href="#retrieve-an-existing-document-by-id">Retrieve an existing document by ID</a></li>
<li><a href="#update-document">Update document</a></li>
<li><a href="#delete-document">Delete document</a></li>
</ul>
</li>
<li><a href="#real-time-data-observerving">Real-time data observerving</a><ul>
<li><a href="#start-observing-whole-collection">Start observing whole collection</a></li>
<li><a href="#start-observing-collection-with-filter">Start observing collection with filter</a></li>
<li><a href="#stop-observing">Stop observing</a></li>
<li><a href="#speak-communication">Speak communication</a><ul>
<li><a href="#send-speak">Send speak</a></li>
<li><a href="#receive-speak">Receive speak</a></li>
</ul>
</li>
</ul>
</li>
<li><a href="#queries">Queries</a><ul>
<li><a href="#available-conditions">Available conditions</a><ul>
<li><a href="#making-query">making query</a></li>
</ul>
</li>
</ul>
</li>
<li><a href="#users">Users</a><ul>
<li><a href="#create-a-new-user">Create a new user</a></li>
<li><a href="#retrieve-an-existing-user-by-id">Retrieve an existing user by ID</a></li>
<li><a href="#update-user">Update user</a></li>
<li><a href="#delete-user">Delete user</a></li>
<li><a href="#add-role">Add role</a></li>
<li><a href="#remove-role">Remove role</a></li>
<li><a href="#activating-user">Activating user</a></li>
<li><a href="#login-user">Login user</a></li>
<li><a href="#add-platform-to-user">Add platform to user</a></li>
<li><a href="#retrive-platform">Retrive platform</a></li>
<li><a href="#update-platform">Update platform</a></li>
<li><a href="#delete-platform">Delete platform</a></li>
</ul>
</li>
<li><a href="#communication">Communication</a><ul>
<li><a href="#send-notification">Send notification</a></li>
<li><a href="#send-email">Send email</a></li>
</ul>
</li>
<li><a href="#files">Files</a><ul>
<li><a href="#upload-file">Upload file</a></li>
<li><a href="#retrieve-file-by-id">Retrieve file by ID</a></li>
<li><a href="#delete-file">Delete file</a></li>
</ul>
</li>
<li><a href="#cloud-code">Cloud Code</a><ul>
<li><a href="#run-cloud-code">Run cloud code</a></li>
</ul>
</li>
<li><a href="#batch-request">Batch request</a><ul>
<li><a href="#adding-to-batch">Adding to batch</a></li>
<li><a href="#using-batch">Using batch</a></li>
</ul>
</li>
<li><a href="#changelog">Changelog</a><ul>
<li><a href="#version-214-22-4-2015">Version 2.1.4 (22. 4. 2015)</a></li>
</ul>
</li>
<li><a href="#license">License</a></li>
</ul>
</li>
</ul>
</div>
</p>



<h2 id="synergykit-initialization">SynergyKit Initialization</h2>

<p>Include the module:</p>



<pre class="prettyprint"><code class="language-html hljs "><span class="hljs-tag">&lt;<span class="hljs-title">script</span> <span class="hljs-attribute">type</span>=<span class="hljs-value">"text/javascript"</span> <span class="hljs-attribute">src</span>=<span class="hljs-value">"https://synergykit.blob.core.windows.net/synergykit/synergykit.min.js"</span>&gt;</span><span class="javascript"></span><span class="hljs-tag">&lt;/<span class="hljs-title">script</span>&gt;</span></code></pre>

<p>Than initialize SynergyKit:</p>



<pre class="prettyprint"><code class="language-javascript hljs ">Synergykit.Init(your_application_url, your_application_key, {
    debug: <span class="hljs-literal">true</span> <span class="hljs-comment">// You should set it to false in production</span>
});</code></pre>



<h2 id="documents">Documents</h2>

<p>Documents are data saved in collections. Collections are basically tables in database where you can store your data. By sending requests to the documents endpoint, you can list, create, update or delete documents.</p>



<h3 id="create-new-document">Create new document</h3>

<table>
<thead>
<tr>
  <th align="left">Parameter</th>
  <th align="left">Type</th>
  <th align="left">Notes</th>
  <th align="center"></th>
</tr>
</thead>
<tbody><tr>
  <td align="left">collection</td>
  <td align="left">string</td>
  <td align="left">Location of document</td>
  <td align="center"><strong>required</strong></td>
</tr>
<tr>
  <td align="left">*</td>
  <td align="left">?</td>
  <td align="left">Optional parameters</td>
  <td align="center">optional</td>
</tr>
</tbody></table>




<pre class="prettyprint"><code class="language-javascript hljs "><span class="hljs-comment">// Create instance of Data object and to the parametr specify the collection where to save</span>
<span class="hljs-keyword">var</span> spaceShip = Synergykit.Data(<span class="hljs-string">"SpaceShips"</span>);

<span class="hljs-comment">// Set any properities you want</span>
spaceShip.set(<span class="hljs-string">"type"</span>, <span class="hljs-string">"Star Fighter"</span>);
spaceShip.set(<span class="hljs-string">"code"</span>, <span class="hljs-string">"ARC-170"</span>);
spaceShip.set(<span class="hljs-string">"description"</span>, <span class="hljs-string">"Protecting the skies over Republic worlds were specialized clone fighter forces flying the latest in starfighter technology."</span>);

<span class="hljs-comment">// And save data to SynergyKit</span>
spaceShip.save({
    success: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(spaceShip, statusCode)</span> {</span>
        <span class="hljs-comment">// Your implementation after the space ship is saved</span>
        console.log(spaceShip.get(<span class="hljs-string">"type"</span>));
    },
    error: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(error, statusCode)</span> {</span>
        <span class="hljs-comment">// Your implementation if the save fails</span>
    }
});</code></pre>



<h3 id="retrieve-an-existing-document-by-id">Retrieve an existing document by ID</h3>

<table>
<thead>
<tr>
  <th align="left">Parameter</th>
  <th align="left">Type</th>
  <th align="left">Notes</th>
  <th align="center"></th>
</tr>
</thead>
<tbody><tr>
  <td align="left">collection</td>
  <td align="left">string</td>
  <td align="left">Location of document</td>
  <td align="center"><strong>required</strong></td>
</tr>
<tr>
  <td align="left">_id</td>
  <td align="left">string</td>
  <td align="left">API identificator</td>
  <td align="center"><strong>required</strong></td>
</tr>
</tbody></table>




<pre class="prettyprint"><code class="language-javascript hljs "><span class="hljs-keyword">var</span> spaceShip = Synergykit.Data(<span class="hljs-string">"SpaceShips"</span>);

<span class="hljs-comment">// Set any properities you want</span>
spaceShip.set(<span class="hljs-string">"_id"</span>, <span class="hljs-string">"weh80EjefeEFEoejofe880"</span>);

<span class="hljs-comment">// And fetch data from SynergyKit</span>
spaceShip.fetch({
    success: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(spaceShip, statusCode)</span> {</span>
        <span class="hljs-comment">// Your implementation after the space ship is fetched</span>
    },
    error: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(error, statusCode)</span> {</span>
        <span class="hljs-comment">// Your implementation if the fetch fails</span>
    }
});</code></pre>



<h3 id="update-document">Update document</h3>

<p>Save method executes <code>PUT</code> request if <code>_id</code> is set.</p>

<table>
<thead>
<tr>
  <th align="left">Parameter</th>
  <th align="left">Type</th>
  <th align="left">Notes</th>
  <th align="center"></th>
</tr>
</thead>
<tbody><tr>
  <td align="left">collection</td>
  <td align="left">string</td>
  <td align="left">Location of document</td>
  <td align="center"><strong>required</strong></td>
</tr>
<tr>
  <td align="left">_id</td>
  <td align="left">string</td>
  <td align="left">API identificator</td>
  <td align="center"><strong>required</strong></td>
</tr>
<tr>
  <td align="left">*</td>
  <td align="left">?</td>
  <td align="left">Optional parameters</td>
  <td align="center">optional</td>
</tr>
</tbody></table>




<pre class="prettyprint"><code class="language-javascript hljs "><span class="hljs-keyword">var</span> spaceShip = Synergykit.Data(<span class="hljs-string">"SpaceShips"</span>);

<span class="hljs-comment">// Set any properities you want</span>
spaceShip.set(<span class="hljs-string">"_id"</span>, <span class="hljs-string">"weh80EjefeEFEoejofe880"</span>);
spaceShip.set(<span class="hljs-string">"pilor"</span>, <span class="hljs-string">"Anakin"</span>);

spaceShip.save({
    success: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(spaceShip, statusCode)</span> {</span>
        <span class="hljs-comment">// Your implementation after the space ship is updated</span>
    },
    error: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(error, statusCode)</span> {</span>
        <span class="hljs-comment">// Your implementation if the update fails</span>
    }
});</code></pre>



<h3 id="delete-document">Delete document</h3>

<table>
<thead>
<tr>
  <th align="left">Parameter</th>
  <th align="left">Type</th>
  <th align="left">Notes</th>
  <th align="center"></th>
</tr>
</thead>
<tbody><tr>
  <td align="left">collection</td>
  <td align="left">string</td>
  <td align="left">Location of document</td>
  <td align="center"><strong>required</strong></td>
</tr>
<tr>
  <td align="left">_id</td>
  <td align="left">string</td>
  <td align="left">API identificator</td>
  <td align="center"><strong>required</strong></td>
</tr>
</tbody></table>




<pre class="prettyprint"><code class="language-javascript hljs "><span class="hljs-keyword">var</span> spaceShip = Synergykit.Data(<span class="hljs-string">"SpaceShips"</span>);

<span class="hljs-comment">// Set any properities you want</span>
spaceShip.set(<span class="hljs-string">"_id"</span>, <span class="hljs-string">"weh80EjefeEFEoejofe880"</span>);

spaceShip.destroy({
    success: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(spaceShip, statusCode)</span> {</span>
        <span class="hljs-comment">// Your implementation after the space ship is updated</span>
    },
    error: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(error, statusCode)</span> {</span>
        <span class="hljs-comment">// Your implementation if the update fails</span>
    }
});</code></pre>



<h2 id="real-time-data-observerving">Real-time data observerving</h2>

<p>SDK supports real time communication through sockets. You can observe these types of changes.</p>

<ul>
<li>POST as “created”</li>
<li>PUT as “updated”</li>
<li>PATCH as “patched”</li>
<li>DELETE as “deleted”</li>
</ul>



<h3 id="start-observing-whole-collection">Start observing whole collection</h3>

<table>
<thead>
<tr>
  <th align="left">Parameter</th>
  <th align="left">Type</th>
  <th align="left">Notes</th>
  <th align="center"></th>
</tr>
</thead>
<tbody><tr>
  <td align="left">collection</td>
  <td align="left">string</td>
  <td align="left">Location of document</td>
  <td align="center"><strong>required</strong></td>
</tr>
</tbody></table>




<pre class="prettyprint"><code class="language-javascript hljs "><span class="hljs-comment">// Create reference to the collection</span>
<span class="hljs-keyword">var</span> spaceShips = Synergykit.Data(<span class="hljs-string">"SpaceShips"</span>);

<span class="hljs-comment">// Specify the event of listening, allowed are "created", "updated", "patched" and "deleted"</span>
spaceShips.on(<span class="hljs-string">"created"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(createdSpaceShip)</span> {</span>
    <span class="hljs-comment">// Work with returned instance like with any other SynergyKit object</span>
});</code></pre>



<h3 id="start-observing-collection-with-filter">Start observing collection with filter</h3>

<table>
<thead>
<tr>
  <th align="left">Parameter</th>
  <th align="left">Type</th>
  <th align="left">Notes</th>
  <th align="center"></th>
</tr>
</thead>
<tbody><tr>
  <td align="left">collection</td>
  <td align="left">string</td>
  <td align="left">Location of document</td>
  <td align="center"><strong>required</strong></td>
</tr>
<tr>
  <td align="left">query</td>
  <td align="left">Synergykit.Query</td>
  <td align="left">Query with filter</td>
  <td align="center"><strong>required</strong></td>
</tr>
</tbody></table>




<pre class="prettyprint"><code class="language-javascript hljs "><span class="hljs-comment">// Create reference to the collection</span>
<span class="hljs-keyword">var</span> spaceShips = Synergykit.Data(<span class="hljs-string">"SpaceShips"</span>);

<span class="hljs-comment">// Create query</span>
<span class="hljs-keyword">var</span> query = Synergykit.Query(spaceShips);
query.where().attribute(<span class="hljs-string">"pilot"</span>).isEqualTo(<span class="hljs-string">"Anakin"</span>);

<span class="hljs-comment">// Specify the event of listening, allowed are "created", "updated", "patched" and "deleted" and set the querey as second parameter</span>
spaceShips.on(<span class="hljs-string">"created"</span>, query, <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(createdSpaceShip)</span> {</span>
    <span class="hljs-comment">// Work with returned instance like with any other SynergyKit object</span>
});</code></pre>



<h3 id="stop-observing">Stop observing</h3>



<pre class="prettyprint"><code class="language-javascript hljs "><span class="hljs-comment">// Create reference to the collection</span>
<span class="hljs-keyword">var</span> spaceShips = Synergykit.Data(<span class="hljs-string">"SpaceShips"</span>);
spaceShips.off(<span class="hljs-string">"created"</span>);</code></pre>



<h3 id="speak-communication">Speak communication</h3>

<p>Communication without data storage from device to device.</p>



<h4 id="send-speak">Send speak</h4>

<table>
<thead>
<tr>
  <th align="left">Parameter</th>
  <th align="left">Type</th>
  <th align="left">Notes</th>
  <th align="center"></th>
</tr>
</thead>
<tbody><tr>
  <td align="left">speakName</td>
  <td align="left">string</td>
  <td align="left">Name of the speak</td>
  <td align="center"><strong>required</strong></td>
</tr>
<tr>
  <td align="left">*</td>
  <td align="left">?</td>
  <td align="left">Optional parameters</td>
  <td align="center">optional</td>
</tr>
</tbody></table>




<pre class="prettyprint"><code class="language-javascript hljs ">Synergykit.speak(<span class="hljs-string">"typing"</span>, <span class="hljs-string">"May the force be with you!"</span>)</code></pre>



<h4 id="receive-speak">Receive speak</h4>

<table>
<thead>
<tr>
  <th align="left">Parameter</th>
  <th align="left">Type</th>
  <th align="left">Notes</th>
  <th align="center"></th>
</tr>
</thead>
<tbody><tr>
  <td align="left">speakName</td>
  <td align="left">string</td>
  <td align="left">Name of the speak</td>
  <td align="center"><strong>required</strong></td>
</tr>
</tbody></table>




<pre class="prettyprint"><code class="language-javascript hljs ">Synergykit.on(<span class="hljs-string">"typing"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(message)</span> {</span>
    console.log(message); <span class="hljs-comment">// "May the force be with you!"</span>
})</code></pre>



<h2 id="queries">Queries</h2>

<p>You can retrieve multiple objects at once by sending a request with query. If query has no conditions API returns simply lists of all objects in collection.</p>

<p>For more complex filtering and sorting Synergykit accepts OData standard. These queries can be used with data, users and files.</p>



<h3 id="available-conditions">Available conditions</h3>

<p>Query string is builded according to <a href="http://odata.org">OData Protocol</a> and is appended to the end of the url.</p>

<p>The OData Protocol specification defines how to standardize a typed, resource-oriented CRUD interface for manipulating data sources by providing collections of entries which must have required elements.</p>



<h4 id="making-query">making query</h4>



<pre class="prettyprint"><code class="language-javascript hljs "><span class="hljs-comment">// Create reference to the collection</span>
<span class="hljs-keyword">var</span> spaceShips = Skit.Data(<span class="hljs-string">"SpaceShips"</span>);

<span class="hljs-comment">// Create query and insert reference to collection or users or files as first parameter</span>
<span class="hljs-keyword">var</span> query = Skit.Query(spaceShips);
query.where() <span class="hljs-comment">// Initialize filter</span>
.attribute(<span class="hljs-string">"name"</span>) <span class="hljs-comment">// Attribute which you want filter. Notice that you can chain the query functions</span>
.isEqualTo(<span class="hljs-string">"Anakin Skywalker"</span>)
.or()
.attribute(<span class="hljs-string">"name"</span>)
.isNotEqualTo(<span class="hljs-string">"Darth Vader"</span>)
.or()
.attribute(<span class="hljs-string">"light_sabers"</span>)
.isGreaterThan(<span class="hljs-number">1</span>) <span class="hljs-comment">// You can also use isGreaterOrEqualThan()</span>
.and()
.attribute(<span class="hljs-string">"light_sabers"</span>)
.isLessThan(<span class="hljs-number">5</span>) <span class="hljs-comment">// You can also use isLessOrEqualThan()</span>
.or()
.substringOf(<span class="hljs-string">"name"</span>, <span class="hljs-string">"akin"</span>) <span class="hljs-comment">// Searching for substring in name</span>
.or()
.startsWith(<span class="hljs-string">"name"</span>, <span class="hljs-string">"Ana"</span>) <span class="hljs-comment">// Searching for starting string</span>
.or()
.isInArray(<span class="hljs-string">"ships"</span>, <span class="hljs-string">"Falcon"</span>) <span class="hljs-comment">// Searching for starting string</span>
.or()
.endsWith(<span class="hljs-string">"name"</span>, <span class="hljs-string">"lker"</span>) <span class="hljs-comment">// Now you get it, don't you? :)</span>
.select(<span class="hljs-string">"name,lightsaber,gender"</span>) <span class="hljs-comment">// Projection of what attribute you want back</span>
.orderBy(<span class="hljs-string">"name"</span>).desc()
.skip(<span class="hljs-number">10</span>) <span class="hljs-comment">// How many results you want to skip</span>
.top(<span class="hljs-number">20</span>) <span class="hljs-comment">// How many results you want get back</span>
.inlineCount() <span class="hljs-comment">// If you call this function, result will be number of checking results.</span>
.find({
    success: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(spaceShips, statusCode)</span> {</span>
        <span class="hljs-comment">// Your implementation after spaceShips array return</span>
    },
    error: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(error, statusCode)</span> {</span>
        <span class="hljs-comment">// Your implementation if the query fails</span>
    }
}) <span class="hljs-comment">// And run the query</span></code></pre>

<p>Available relation operators</p>

<ul>
<li><code>==</code> as <code>isEqualTo</code></li>
<li><code>!=</code> as <code>isNotEqualTo</code></li>
<li><code>&gt;=</code> as <code>isGreaterOrEqualThan</code></li>
<li><code>&lt;=</code> as <code>isLessOrEqualThan</code></li>
<li><code>&gt;</code> as <code>isGreaterThan</code></li>
<li><code>&lt;</code> as <code>isLessThan</code></li>
</ul>



<h2 id="users">Users</h2>

<p>Users are alfa and omega of every application. In SynergyKit you can easily work with your users by methods listed below.</p>



<h3 id="create-a-new-user">Create a new user</h3>

<table>
<thead>
<tr>
  <th align="left">Parameter</th>
  <th align="left">Type</th>
  <th align="left">Notes</th>
  <th align="center"></th>
</tr>
</thead>
<tbody><tr>
  <td align="left">*</td>
  <td align="left">?</td>
  <td align="left">Optional parameters</td>
  <td align="center">optional</td>
</tr>
</tbody></table>




<pre class="prettyprint"><code class="language-javascript hljs "><span class="hljs-comment">// Create instance of User object</span>
<span class="hljs-keyword">var</span> user = Synergykit.User();

<span class="hljs-comment">// Set any properities you want</span>
user.set(<span class="hljs-string">"name"</span>, <span class="hljs-string">"Anakin Skywalker"</span>);
user.set(<span class="hljs-string">"email"</span>, <span class="hljs-string">"anakin@skywalker.com"</span>);
user.set(<span class="hljs-string">"password"</span>, <span class="hljs-string">"Falcon"</span>);

<span class="hljs-comment">// And save user to SynergyKit</span>
user.save({
    success: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(user, statusCode)</span> {</span>
        <span class="hljs-comment">// Your implementation after the user is saved</span>
    },
    error: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(error, statusCode)</span> {</span>
        <span class="hljs-comment">// Your implementation if the save fails</span>
    }
});</code></pre>



<h3 id="retrieve-an-existing-user-by-id">Retrieve an existing user by ID</h3>

<table>
<thead>
<tr>
  <th align="left">Parameter</th>
  <th align="left">Type</th>
  <th align="left">Notes</th>
  <th align="center"></th>
</tr>
</thead>
<tbody><tr>
  <td align="left">_id</td>
  <td align="left">string</td>
  <td align="left">API identificator</td>
  <td align="center"><strong>required</strong></td>
</tr>
</tbody></table>




<pre class="prettyprint"><code class="language-javascript hljs "><span class="hljs-comment">// Create instance of User object</span>
<span class="hljs-keyword">var</span> user = Synergykit.User();
user.set(<span class="hljs-string">"_id"</span>, <span class="hljs-string">"ewljqhqherphwejr"</span>);

<span class="hljs-comment">// And retrieve user from SynergyKit</span>
user.fetch({
    success: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(user, statusCode)</span> {</span>
        <span class="hljs-comment">// Your implementation after the user is retrieved</span>
    },
    error: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(error, statusCode)</span> {</span>
        <span class="hljs-comment">// Your implementation if the retrieve fails</span>
    }
});</code></pre>



<h3 id="update-user">Update user</h3>

<p>Save method executes <code>PUT</code> request if <code>_id</code> is set. </p>

<table>
<thead>
<tr>
  <th align="left">Parameter</th>
  <th align="left">Type</th>
  <th align="left">Notes</th>
  <th align="center"></th>
</tr>
</thead>
<tbody><tr>
  <td align="left">_id</td>
  <td align="left">string</td>
  <td align="left">API identificator</td>
  <td align="center"><strong>required</strong></td>
</tr>
<tr>
  <td align="left">*</td>
  <td align="left">?</td>
  <td align="left">Optional parameters</td>
  <td align="center">optional</td>
</tr>
</tbody></table>




<pre class="prettyprint"><code class="language-javascript hljs "><span class="hljs-comment">// Create instance of User object</span>
<span class="hljs-keyword">var</span> user = Synergykit.User();
user.set(<span class="hljs-string">"_id"</span>, <span class="hljs-string">"ewljqhqherphwejr"</span>);
user.set(<span class="hljs-string">"ship"</span>, <span class="hljs-string">"Falcon"</span>);

<span class="hljs-comment">// And update user from SynergyKit</span>
user.save({
    success: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(user, statusCode)</span> {</span>
        <span class="hljs-comment">// Your implementation after the user is updated</span>
    },
    error: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(error, statusCode)</span> {</span>
        <span class="hljs-comment">// Your implementation if the update fails</span>
    }
});</code></pre>



<h3 id="delete-user">Delete user</h3>

<table>
<thead>
<tr>
  <th align="left">Parameter</th>
  <th align="left">Type</th>
  <th align="left">Notes</th>
  <th align="center"></th>
</tr>
</thead>
<tbody><tr>
  <td align="left">_id</td>
  <td align="left">string</td>
  <td align="left">API identificator</td>
  <td align="center"><strong>required</strong></td>
</tr>
</tbody></table>




<pre class="prettyprint"><code class="language-javascript hljs "><span class="hljs-comment">// Create instance of User object</span>
<span class="hljs-keyword">var</span> user = Synergykit.User();
user.set(<span class="hljs-string">"_id"</span>, <span class="hljs-string">"ewljqhqherphwejr"</span>);

<span class="hljs-comment">// And delete user from SynergyKit</span>
user.destroy({
    success: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(user, statusCode)</span> {</span>
        <span class="hljs-comment">// Your implementation after the user is deleted</span>
    },
    error: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(error, statusCode)</span> {</span>
        <span class="hljs-comment">// Your implementation if the delete fails</span>
    }
});</code></pre>



<h3 id="add-role">Add role</h3>

<table>
<thead>
<tr>
  <th align="left">Parameter</th>
  <th align="left">Type</th>
  <th align="left">Notes</th>
  <th align="center"></th>
</tr>
</thead>
<tbody><tr>
  <td align="left">_id</td>
  <td align="left">string</td>
  <td align="left">API identificator</td>
  <td align="center"><strong>required</strong></td>
</tr>
<tr>
  <td align="left">role</td>
  <td align="left">string</td>
  <td align="left"></td>
  <td align="center"><strong>required</strong></td>
</tr>
</tbody></table>




<pre class="prettyprint"><code class="language-javascript hljs "><span class="hljs-comment">// Create instance of User object</span>
<span class="hljs-keyword">var</span> user = Synergykit.User();
user.set(<span class="hljs-string">"_id"</span>, <span class="hljs-string">"ewljqhqherphwejr"</span>);

<span class="hljs-comment">// And add role to user</span>
user.addRole(<span class="hljs-string">"pilot"</span>, {
    success: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(user, statusCode)</span> {</span>
        <span class="hljs-comment">// Your implementation after the role is added</span>
    },
    error: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(error, statusCode)</span> {</span>
        <span class="hljs-comment">// Your implementation if the update fails</span>
    }
});</code></pre>



<h3 id="remove-role">Remove role</h3>

<table>
<thead>
<tr>
  <th align="left">Parameter</th>
  <th align="left">Type</th>
  <th align="left">Notes</th>
  <th align="center"></th>
</tr>
</thead>
<tbody><tr>
  <td align="left">_id</td>
  <td align="left">string</td>
  <td align="left">API identificator</td>
  <td align="center"><strong>required</strong></td>
</tr>
<tr>
  <td align="left">role</td>
  <td align="left">string</td>
  <td align="left"></td>
  <td align="center"><strong>required</strong></td>
</tr>
</tbody></table>




<pre class="prettyprint"><code class="language-javascript hljs "><span class="hljs-comment">// Create instance of User object</span>
<span class="hljs-keyword">var</span> user = Synergykit.User();
user.set(<span class="hljs-string">"_id"</span>, <span class="hljs-string">"ewljqhqherphwejr"</span>);

<span class="hljs-comment">// And remove role from user</span>
user.removeRole(<span class="hljs-string">"pilot"</span>, {
    success: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(user, statusCode)</span> {</span>
        <span class="hljs-comment">// Your implementation after the role is removed</span>
    },
    error: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(error, statusCode)</span> {</span>
        <span class="hljs-comment">// Your implementation if the update fails</span>
    }
});</code></pre>



<h3 id="activating-user">Activating user</h3>

<p>By default, user is not activated. This mean, that you can use this state to validate user e-mail address by sending him activation link.</p>

<p>To activate user, send an email with this activation link /v2.1/users/activation/[ACTIVATION_HASH]. You can provide parameter callback with url address where you want to redirect user after activation.</p>

<p>Or <strong>if you know that e-mail address is valid</strong> you can activate user with SDK.</p>

<table>
<thead>
<tr>
  <th align="left">Parameter</th>
  <th align="left">Type</th>
  <th align="left">Notes</th>
  <th align="center"></th>
</tr>
</thead>
<tbody><tr>
  <td align="left">_id</td>
  <td align="left">string</td>
  <td align="left">API identificator</td>
  <td align="center"><strong>required</strong></td>
</tr>
</tbody></table>




<pre class="prettyprint"><code class="language-javascript hljs "><span class="hljs-comment">// Create instance of User object</span>
<span class="hljs-keyword">var</span> user = Synergykit.User();
user.set(<span class="hljs-string">"_id"</span>, <span class="hljs-string">"ewljqhqherphwejr"</span>);
user.set(<span class="hljs-string">"isActivated"</span>, <span class="hljs-literal">true</span>);

<span class="hljs-comment">// And update user to SynergyKit</span>
user.save({
    success: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(user, statusCode)</span> {</span>
        <span class="hljs-comment">// Your implementation after the user is updated</span>
    },
    error: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(error, statusCode)</span> {</span>
        <span class="hljs-comment">// Your implementation if the update fails</span>
    }
});</code></pre>



<h3 id="login-user">Login user</h3>

<p>If user was registrated via normal way, which means by email and password, you can authenticate him with login method.</p>

<table>
<thead>
<tr>
  <th align="left">Parameter</th>
  <th align="left">Type</th>
  <th align="left">Notes</th>
  <th align="center"></th>
</tr>
</thead>
<tbody><tr>
  <td align="left">email</td>
  <td align="left">string</td>
  <td align="left">User e-mail</td>
  <td align="center"><strong>required</strong></td>
</tr>
<tr>
  <td align="left">password</td>
  <td align="left">string</td>
  <td align="left">User password</td>
  <td align="center"><strong>required</strong></td>
</tr>
</tbody></table>




<pre class="prettyprint"><code class="language-javascript hljs "><span class="hljs-comment">// Create instance of User object</span>
<span class="hljs-keyword">var</span> user = Synergykit.User();
user.set(<span class="hljs-string">"email"</span>, <span class="hljs-string">"anakin@skywalker.com"</span>);
user.set(<span class="hljs-string">"password"</span>,<span class="hljs-string">"Falcon"</span>);

<span class="hljs-comment">// And login user to SynergyKit</span>
user.login({
    success: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(user, statusCode)</span> {</span>
        <span class="hljs-comment">// User object with session token will be returned</span>
    },
    error: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(error, statusCode)</span> {</span>
        <span class="hljs-comment">// Your implementation if the login fails</span>
    }
});</code></pre>



<h3 id="add-platform-to-user">Add platform to user</h3>

<p>Platforms are useful for pairing individual mobile devices or web applications to the user via registration ID. After assignment platform to the user you will be able to send push notifications to the device or application.</p>

<p><strong>Before you can work with platforms</strong> of user is needed to login first. After successful login SDK receives sessionToken for authentication of user. Token is held by the SDK and is automatically inserted into the Headers.</p>

<table>
<thead>
<tr>
  <th align="left">Parameter</th>
  <th align="left">Type</th>
  <th align="left">Notes</th>
  <th align="center"></th>
</tr>
</thead>
<tbody><tr>
  <td align="left">platformName</td>
  <td align="left">string</td>
  <td align="left">Platform name, “android”, “apple” and “web” are supported</td>
  <td align="center"><strong>required</strong></td>
</tr>
<tr>
  <td align="left">registrationId</td>
  <td align="left">string</td>
  <td align="left">Unique device id</td>
  <td align="center"><strong>required</strong></td>
</tr>
</tbody></table>




<pre class="prettyprint"><code class="language-javascript hljs "><span class="hljs-keyword">var</span> platform = Synergykit.Platform()
platform.set(<span class="hljs-string">"platformName"</span>, <span class="hljs-string">"android"</span>)
platform.set(<span class="hljs-string">"registrationId"</span>, <span class="hljs-string">"2343wdhqr9689"</span>)
platform.save({
    success: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(platform, statusCode)</span> {</span>

    },
    error: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(error, statusCode)</span> {</span>
    }
})</code></pre>



<h3 id="retrive-platform">Retrive platform</h3>

<table>
<thead>
<tr>
  <th align="left">Parameter</th>
  <th align="left">Type</th>
  <th align="left">Notes</th>
  <th align="center"></th>
</tr>
</thead>
<tbody><tr>
  <td align="left">_id</td>
  <td align="left">string</td>
  <td align="left">API identificator</td>
  <td align="center"><strong>required</strong></td>
</tr>
</tbody></table>




<pre class="prettyprint"><code class="language-javascript hljs "><span class="hljs-keyword">var</span> platform = Synergykit.Platform()
platform.set(<span class="hljs-string">"_id"</span>, <span class="hljs-string">"qwefqwerqpweor"</span>)
platform.fetch({
    success: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(platform, statusCode)</span> {</span>

    },
    error: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(error, statusCode)</span> {</span>
    }
})</code></pre>



<h3 id="update-platform">Update platform</h3>

<p>Platforms contain of a few parameters but only two are updatable. Save method executes <code>PUT</code> request if <code>_id</code> is set, it could change <code>development</code> and <code>registrationId</code>. </p>

<table>
<thead>
<tr>
  <th align="left">Parameter</th>
  <th align="left">Type</th>
  <th align="left">Notes</th>
  <th align="center"></th>
</tr>
</thead>
<tbody><tr>
  <td align="left">_id</td>
  <td align="left">string</td>
  <td align="left">API identificator</td>
  <td align="center"><strong>required</strong></td>
</tr>
<tr>
  <td align="left">registrationId</td>
  <td align="left">NSString</td>
  <td align="left">Device id</td>
  <td align="center">optional</td>
</tr>
</tbody></table>




<pre class="prettyprint"><code class="language-javascript hljs "><span class="hljs-keyword">var</span> platform = Synergykit.Platform()
platform.set(<span class="hljs-string">"_id"</span>, <span class="hljs-string">"qwefqwerqpweor"</span>)
platform.set(<span class="hljs-string">"registrationId"</span>, <span class="hljs-string">"7070EJR"</span>);
platform.save({
    success: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(platform, statusCode)</span> {</span>

    },
    error: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(error, statusCode)</span> {</span>
    }
})</code></pre>



<h3 id="delete-platform">Delete platform</h3>

<table>
<thead>
<tr>
  <th align="left">Parameter</th>
  <th align="left">Type</th>
  <th align="left">Notes</th>
  <th align="center"></th>
</tr>
</thead>
<tbody><tr>
  <td align="left">_id</td>
  <td align="left">string</td>
  <td align="left">API identificator</td>
  <td align="center"><strong>required</strong></td>
</tr>
</tbody></table>




<pre class="prettyprint"><code class="language-javascript hljs "><span class="hljs-keyword">var</span> platform = Synergykit.Platform()
platform.set(<span class="hljs-string">"_id"</span>, <span class="hljs-string">"qwefqwerqpweor"</span>)
platform.destroy({
    success: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(platform, statusCode)</span> {</span>

    },
    error: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(error, statusCode)</span> {</span>
    }
})</code></pre>



<h2 id="communication">Communication</h2>

<p>In SynergyKit you can communicate with your users by different ways. There are listed some methods below this section.</p>

<p>One way is to sending push notifications into user devices. This action need to have filled your API key for Android devices in Settings, section Android. For push notifications into iOS devices you need to fill your password and certificates into Apple section in Settings.</p>

<p>Another way is to sending emails to your users. For this you need to create email templates in administration under Mailing section.</p>



<h3 id="send-notification">Send notification</h3>

<table>
<thead>
<tr>
  <th align="left">Parameter</th>
  <th align="left">Type</th>
  <th align="left">Notes</th>
  <th align="center"></th>
</tr>
</thead>
<tbody><tr>
  <td align="left">recipients</td>
  <td align="left">Synergykit.User</td>
  <td align="left">User or array of Users</td>
  <td align="center"><strong>required</strong></td>
</tr>
<tr>
  <td align="left">alert</td>
  <td align="left">string</td>
  <td align="left">Alert message of notification</td>
  <td align="center">optional</td>
</tr>
<tr>
  <td align="left">badge</td>
  <td align="left">number</td>
  <td align="left">Badge to be shown on app icon</td>
  <td align="center">optional</td>
</tr>
<tr>
  <td align="left">payload</td>
  <td align="left">string</td>
  <td align="left">Notification payload</td>
  <td align="center">optional</td>
</tr>
<tr>
  <td align="left">sound</td>
  <td align="left">string</td>
  <td align="left">Soud to be played on notification income</td>
  <td align="center">optional</td>
</tr>
</tbody></table>




<pre class="prettyprint"><code class="language-javascript hljs "><span class="hljs-keyword">var</span> notification = Synergykit.Notification(SynergykitUser)
notification.set(<span class="hljs-string">"alert"</span>, <span class="hljs-string">"I'm your father!"</span>)
notification.send({
    success: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(result, statusCode)</span> {</span>

    },
    error: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(error, statusCode)</span> {</span>
    }
})</code></pre>



<h3 id="send-email">Send email</h3>

<table>
<thead>
<tr>
  <th align="left">Parameter</th>
  <th align="left">Type</th>
  <th align="left">Notes</th>
  <th align="center"></th>
</tr>
</thead>
<tbody><tr>
  <td align="left">mailTemplate</td>
  <td align="left">string</td>
  <td align="left">Name of mail template</td>
  <td align="center"><strong>required</strong></td>
</tr>
<tr>
  <td align="left">email</td>
  <td align="left">string</td>
  <td align="left">Email of recipient</td>
  <td align="center"><strong>required</strong></td>
</tr>
<tr>
  <td align="left">subject</td>
  <td align="left">string</td>
  <td align="left">Subject of mail</td>
  <td align="center"><strong>required</strong></td>
</tr>
<tr>
  <td align="left">*</td>
  <td align="left">?</td>
  <td align="left">Parameters for mail template</td>
  <td align="center">optional</td>
</tr>
</tbody></table>




<pre class="prettyprint"><code class="language-javascript hljs "><span class="hljs-keyword">var</span> mail = Synergykit.Mail(<span class="hljs-string">"myTemplate"</span>)
mail.set(<span class="hljs-string">"email"</span>, <span class="hljs-string">"anakin@skywalker.com"</span>)
mail.set(<span class="hljs-string">"subject"</span>, <span class="hljs-string">"Greetings from Tatooine"</span>)
mail.send({
    success: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(result, statusCode)</span> {</span>

    },
    error: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(error, statusCode)</span> {</span>
    }
})</code></pre>



<h2 id="files">Files</h2>

<p>SynergyKit can be also used for storing as much quantity of files as you need for your application.</p>



<h3 id="upload-file">Upload file</h3>



<pre class="prettyprint"><code class="language-javascript hljs "><span class="hljs-keyword">var</span> input = document.getElementById(<span class="hljs-string">'fileinput'</span>);
<span class="hljs-keyword">var</span> file = Synergykit.File(input.files[<span class="hljs-number">0</span>])
file.upload({
    success: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(file, statusCode)</span> {</span>
        console.log(file.get())
    },
    error: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(error, statusCode)</span> {</span>
        console.log(error)
    }
})</code></pre>



<h3 id="retrieve-file-by-id">Retrieve file by ID</h3>



<pre class="prettyprint"><code class="language-javascript hljs "><span class="hljs-keyword">var</span> file = Synergykit.File()
file.set(<span class="hljs-string">"_id"</span>, <span class="hljs-string">"JL08jljelr70jl"</span>)
file.fetch({
    success: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(file, statusCode)</span> {</span>
        console.log(file.get())
    },
    error: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(error, statusCode)</span> {</span>
        console.log(error)
    }
})</code></pre>



<h3 id="delete-file">Delete file</h3>



<pre class="prettyprint"><code class="language-javascript hljs "><span class="hljs-keyword">var</span> file = Synergykit.File()
file.set(<span class="hljs-string">"_id"</span>, <span class="hljs-string">"JL08jljelr70jl"</span>)
file.destroy({
    success: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(result, statusCode)</span> {</span>

    },
    error: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(error, statusCode)</span> {</span>
        console.log(error)
    }
})</code></pre>



<h2 id="cloud-code">Cloud Code</h2>

<p>Our vision is to let developers build any app without dealing with servers. For complex apps, sometimes you just need a bit of logic that isn’t running on a mobile device. Cloud Code makes this possible.</p>



<h3 id="run-cloud-code">Run cloud code</h3>



<pre class="prettyprint"><code class="language-javascript hljs "><span class="hljs-keyword">var</span> cloudCode = Synergykit.CloudCode(<span class="hljs-string">"example"</span>)
cloudCode.set(<span class="hljs-string">"name"</span>, <span class="hljs-string">"Anakin"</span>)
cloudCode.run({
    success: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(result, statusCode)</span> {</span>

    },
    error: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(error, statusCode)</span> {</span>

    }
})</code></pre>



<h2 id="batch-request">Batch request</h2>

<p>To reduce the amount of time spent on network round trips, you can get, create, update, or delete up to 50 objects in one call, using the batch endpoint.</p>



<h3 id="adding-to-batch">Adding to batch</h3>

<p>Calling methods like <code>save</code>, <code>fetch</code>, <code>destroy</code> etc. without setting callbacks, add them to the batch buffer, where they are waiting in queue.</p>



<h3 id="using-batch">Using batch</h3>



<pre class="prettyprint"><code class="language-javascript hljs "><span class="hljs-keyword">var</span> gameScore = Synergykit.Data(<span class="hljs-string">"GameScore"</span>)
gameScore.set(<span class="hljs-string">"score"</span>, <span class="hljs-number">1337</span>)
gameScore.save()

<span class="hljs-keyword">var</span> gameScore2 = Synergykit.Data(<span class="hljs-string">"GameScore"</span>)
gameScore2.set(<span class="hljs-string">"score"</span>, <span class="hljs-number">1338</span>)
gameScore2.save()
Synergykit.runBatch({
    success: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(result, statusCode)</span> {</span>

    },
    error: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(error, statusCode)</span> {</span>

    }
})</code></pre>



<h2 id="changelog">Changelog</h2>



<h3 id="version-214-22-4-2015">Version 2.1.4 (22. 4. 2015)</h3>

<ul>
<li><strong>SynergyKit v2.1 support</strong></li>
<li>Documents</li>
<li>Real-time data observing</li>
<li>Queries</li>
<li>Users</li>
<li>Platforms</li>
<li>Roles</li>
<li>Communication</li>
<li>Files</li>
<li>CloudCode</li>
<li>Batching requests</li>
</ul>



<h2 id="license">License</h2>

<p>SynergyKit JavaScript SDK is available under the MIT license. See the LICENSE file for more info.</p>