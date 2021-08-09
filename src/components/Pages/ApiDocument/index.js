import React from 'react';
import { Link } from 'react-router-dom';
import './styles.scss';

const apiLink = process.env.REACT_APP_API_DOC;

const ApiDocument = () => {
  return (
    <div className="api-document-page">
      <div className="">
        <Link to="/">
          <img src={require('assets/images/logo/logo.png')} alt="logo" />
        </Link>
      </div>
      <h1 className="border-bottom">API Documentation</h1>
      <h2 className="mb-10">INTRODUCTION</h2>
      <p>Sample api documentation for Edge B2B.</p>
      <h1>Allowed HTTPs requests:</h1>
      <pre>
        <p className="mb-0">GET : Get a resource or list of resources</p>
        <p className="mb-0">POST : To create resource</p>
        <p className="mb-0">PUT : To update resource</p>
        <p className="mb-0">DELETE : To delete resource</p>
      </pre>
      <h1>Description Of Usual Server Responses:</h1>
      <ul className="server-response mlm-20">
        <li>
          <p>
            200 <code>OK</code> - the request was successful (some API calls may
            return 201 instead).
          </p>
        </li>
        <li>
          <p>
            201 <code>Created</code> - the request was successful and a resource
            was created.
          </p>
        </li>
        <li>
          <p>
            204 <code>No Content</code> - the request was successful but there
            is no representation to return (i.e. the response is empty).
          </p>
        </li>
        <li>
          <p>
            400 <code>Bad Request</code> - the request could not be understood
            or was missing required parameters.
          </p>
        </li>
        <li>
          <p>
            401 <code>Unauthorized</code> - authentication failed or user
            doesn't have permissions for requested operation.
          </p>
        </li>
        <li>
          <p>
            403 <code>Forbidden</code> - access denied.
          </p>
        </li>
        <li>
          <p>
            404 <code>Not Found</code> - resource was not found.
          </p>
        </li>
        <li>
          <p>
            405 <code>Method Not Allowed</code> - requested method is not
            supported for resource.
          </p>
        </li>
      </ul>
      <h1>Usage</h1>
      <p>
        Follow the steps below to use APIs. Only <b>Premium Partners</b> can
        have access to these APIs
      </p>
      <h3>1. Get API key</h3>
      <p>
        Logged as <b>Premium Partners</b>, visit{' '}
        <a
          href={`//${process.env.REACT_APP_HOST_NAME}/partners/setting#api-key`}
          target="_blank"
        >
          Profile Setting
        </a>{' '}
        and find API key in API Management section.
      </p>
      <div className="mb-20">
        <img
          src={require('assets/images/api-document/api-management-section.png')}
          width="549"
        />
      </div>
      <h3>2. Use APIs</h3>
      <p>
        To use APIs, visit{' '}
        <a href={apiLink} target="_blank">
          {apiLink}
        </a>{' '}
        and paste the api key to <b>AUTH TOKEN</b> section.
        <br />
        Now you can have access to use APIs.
      </p>
      <div className="mb-10">
        <img
          src={require('assets/images/api-document/auth-token-section.png')}
          width="549"
        />
      </div>
    </div>
  );
};

export default ApiDocument;
