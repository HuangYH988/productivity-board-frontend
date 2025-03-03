import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { URL, customStyles } from "../../constants";
import { useAuth0 } from "@auth0/auth0-react";
import Modal from "react-modal";

export default function EditProj(props) {
  const { editingProject, isOpen, onClose } = props;
  const { getAccessTokenSilently } = useAuth0();
  const navigate = useNavigate();

  const [project, setProject] = useState({
    description: editingProject?.project_description || "", 
    wip: editingProject?.wip_limit || "",
    cycle_time: editingProject?.cycle_time_limit || "",
    comment: editingProject?.project_comments || "",
  });
  
  useEffect(() => {
      setProject({
        description: editingProject?.project_description || "", 
        wip: editingProject?.wip_limit || "",
        cycle_time: editingProject?.cycle_time_limit ||  "",
        comment: editingProject?.project_comments || "",
      });
  }, [editingProject]);

  async function sendPutRequest() {
    const url = `${URL}/project/${editingProject.id}`;

    const requestData = {
      project_description: project.description,
      wip_limit: project.wip,
      cycle_time_limit: project.cycle_time,
      project_comments: project.comment,
    };

    const accessToken = await getAccessTokenSilently({
      audience: process.env.REACT_APP_API_AUDIENCE
    })

    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => {
        return response.json();
      })
      .then(() => {
        setProject({
          description: null,
          wip: null,
          cycle_time: null,
          comment: null,
        });

        navigate(`/projects`);
      })

      .catch((error) => {
        console.error("Error: ", error.message);
      });

      onClose();
  }

  function handleSubmit(event) {
    event.preventDefault();
    sendPutRequest();
    window.location.reload();
  }

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} style={customStyles}>
      <div className="background">
        <form onSubmit={handleSubmit} className="forms">
          <h3 className="form-labels">Project Description:</h3>
          <input
            type="text"
            value={project.description}
            onChange={(e) =>
              setProject({ ...project, description: e.target.value })
            }
            placeholder="Description Here"
          />
          {Array(2).fill(<br />)}
          <h3 className="form-labels">WIP Limit:</h3>
          <input
            type="text"
            value={project.wip}
            onChange={(e) => {
              const inputValue = e.target.value;
              if (/^\d*$/.test(inputValue)) {
                setProject({ ...project, wip: inputValue });
              }
            }}
          />
          {Array(2).fill(<br />)}
          <h3 className="form-labels">Cycle Time Limit:</h3>
          <input
            type="text"
            value={project.cycle_time}
            onChange={(e) => {
              const inputValue = e.target.value;
              if (/^\d*$/.test(inputValue)) {
                setProject({ ...project, cycle_time: inputValue });
              }
            }}
          />
          {Array(2).fill(<br />)}
          <h3 className="form-labels">Please add comments for the project:</h3>
          <textarea
            value={project.comment}
            onChange={(e) => setProject({ ...project, comment: e.target.value })}
            placeholder="Project comments"
            rows={8}
            style={{ width: "90%" }}
          />

          {Array(2).fill(<br />)}
          <button type="submit" className="submit-buttons">Submit</button>
          {"    "}{"    "}
          <button className="back-buttons" onClick={onClose}>Close</button>

        </form>        
      </div>
    </Modal>
  );
}
