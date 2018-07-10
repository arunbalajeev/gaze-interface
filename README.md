## Web Interface for gaze recording

This project allows to create Web Interface for recording the gaze on videos. We used this interface for recording gaze by crowdsourcing the task in Amazon Mechanical Turk for our following work:

"Object Referring in Videos using Language and Human Gaze" - CVPR 2018<br/>
Arun Balajee Vasudevan, Dengxin Dai, Luc Van Gool <br/>
CVLab, ETH Zurich

### Installation

1. Download this repository or clone with Git, then `cd` into the root directory.
2. Copy the folder where your host server have access to. And, mention the path of the folder in L5 in `.htaccess`
3. Define your python packages folder in L8 in `gaze_int.fcgi`. (create the package locally visible to the server)
4. Install the requirements with `pip install -r requirements.txt`
5. Run FastCGI as `./gaze_int.fcgi` in the host server. For debugging, check `server.log`.

### Requirements

User input to the interface: `application/boxes.csv`. 

Check demo at Firefox browser:

	https://people.ee.ethz.ch/~arunv/gaze-interface/gaze_int.fcgi/?image_id=zurich_000005_000029_leftImg8bit

