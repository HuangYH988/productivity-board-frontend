import { useNavigate } from "react-router-dom";
import { URL } from "../../constants";
import "../../Pages/ProjPage.css";

export default function deleteProj(id) {
    const navigate = useNavigate();

    const confirmed = window.confirm(
      "TODO: make this authenticated account only \nWARNING: Deletion is irreversible! \n Are you sure you want to delete this project?"
    );
  
    if (confirmed) {
      const url = `${URL}/project/${id}`;
  
      fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          return response.json();
        })
        .then(() => {
          // Trigger navigation only when the deletion is confirmed
          navigate(`/projects`);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }