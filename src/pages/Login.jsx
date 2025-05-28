import React from "react";
import { Container } from "react-bootstrap";

const Login=()=>
    {
        return(
<Container className="mt-4">
    <img src="image.png" style="border: 2px solid #00FF00;"></img>
    
    <div style="background-color: #FFFFFF; width: 600px; height: 400px; border: 2px solid #000000; margin: 20px;">
        <div style="position: relative; padding: 20px;">
        <img src="comic_panel.png" style="max-width: 100%; max-height: 100%;" />
        <p style="color: #000000; position: absolute; bottom: 20px; left: 20px;">Login.</p>
        
        </div>
    </div>
</Container>
        );
    };

export default Login;