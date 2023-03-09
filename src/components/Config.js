import React, { useEffect, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import * as FlickrAPI from "../data/FlickrAPI";
import { Photo } from "./Photo";

export const Config = props => {
  // Get the API key from local storage.
  const [apiKey, setApiKey] = useLocalStorage("FLICKR_API_KEY", "");
  const [pending, setPending] = useState(false);
  const [tested, setTested] = useState(false);
  const [res, setRes] = useState(null);

  // Test that the API works.
  const testApi = () => {
    setPending(true);
    setTested(false);

    setRes(null);
    FlickrAPI.search(apiKey, "people,food", 3, nextRes => {
      setRes(nextRes);
      setPending(false);
      setTested(true);
    });
  };

  // Handle input changes.
  const onChange = e => {
    setApiKey(e.target.value);
  };

  // Test that the API works.
  const onSubmit = e => {
    e.preventDefault();
    testApi();
  };

  // Allow the parent component to listen to api key changes.
  useEffect(() => {
    if (props.onApiKeyChange) {
      props.onApiKeyChange(apiKey);
    }
  }, [apiKey]);

  return (
    <div id="accordion">
      <div className="card">
        <div className="card-header">
          <h5 className="mb-0">
            <button
              className="accordion-button"
              data-bs-toggle="collapse"
              data-bs-target="#config-form"
            >
              Config
            </button>
          </h5>
        </div>

        <div id="config-form" className="collapse" data-bs-parent="#accordion">
          <div className="card-body">
            <form onSubmit={onSubmit}>
              <div className="form-group">
                <label htmlFor="api-key">Flickr API Key</label>
                <input
                  type="text"
                  className="form-control"
                  id="api-key"
                  value={apiKey}
                  onChange={onChange}
                />
                <small className="form-text text-muted">
                  You can get a new API key or view your existing ones at{" "}
                  <a
                    target="_blank"
                    href="https://www.flickr.com/services/apps/create/"
                  >
                    Flickr
                  </a>
                  .
                </small>
              </div>

              <br />

              <div className="form-group">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={pending}
                >
                  {pending ? "Testing API..." : "Test API"}
                </button>
              </div>

              <br />

              {tested && res && (
                <>
                  {res.stat === "ok" ? (
                    <>
                      <div className="row">
                        {res.photos.photo.map(p => (
                          <div key={p.id} className="col-sm">
                            <Photo photo={p} />
                          </div>
                        ))}
                      </div>
                      <br />
                      <div className="alert alert-success">
                        <p>FlickrAPI.search was successful:</p>
                        <pre>{JSON.stringify(res, null, 2)}</pre>
                      </div>
                    </>
                  ) : (
                    <div className="alert alert-warning">
                      <p>FlickrAPI.search had an issue:</p>
                      <pre>{JSON.stringify(res, null, 2)}</pre>
                    </div>
                  )}
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
