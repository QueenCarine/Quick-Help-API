//CREATE A JOB
const jobs= require('../models/jobsModel')
const createJobController=async(req,res)=>{
    try{
       const{JobName,
        Description,
        Picture
        }=req.body
        //validation
        if(!JobName||!Description||!Picture){
            return res.status(400).send({
                success:false,
                message:"Please fill in all the fields"
            })
        };
        const existingJob = await jobs.findOne({ JobName: JobName });
        if (existingJob) {
            return res.status(400).send({
                success: false,
                message: "Job already exists"
            });
        }
        
        const newJob=jobs({JobName,
            Description,
            Picture
        })
        await newJob.save()
        res.status(201).send({
            success:true,
            message:"Job created successfully"
        })
    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in the Create Job API",
            error
        })
    }

};
//GET A JOB BY IT'S NAME
const getJobByNameController = async (req, res) => {
    try {
        const { JobName } = req.params;

        // Check if the job name exists
        const job = await jobs.findOne({ JobName: JobName });
        if (!job) {
            return res.status(404).send({
                success: false,
                message: "Job not found"
            });
        }

        res.status(200).send({
            success: true,
            data: job
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in the Get Job by Name API",
            error
        });
    }
};
// GET ALL JOBS
const getAllJobsController = async (req, res) => {
    try {
      const jober = await jobs.find({});
      if (!jober) {
        return res.status(404).send({
          success: false,
          message: "No Job Available",
        });
      }
      res.status(200).send({
        success: true,
        totalCount: jober.length,
        jober,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error In Get ALL JOBS API",
        error,
      });
    }
  };
  
  // GET Job BY ID
  const getJobByIdController = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if the job exists
        const job = await jobs.findById(id);
        if (!job) {
            return res.status(404).send({
                success: false,
                message: "Job not found"
            });
        }

        res.status(200).send({
            success: true,
            data: job
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in the Get Job by ID API",
            error
        });
    }
};
  //DELETE JOB
  const deleteJobController = async (req, res) => {
    try {
      const jobId = req.params.id;
      if (!jobId) {
        return res.status(404).send({
          success: false,
          message: "Job Not Found OR Provide Job ID",
        });
      }
      await jobs.findByIdAndDelete(jobId);
      res.status(200).send({
        success: true,
        message: "Job Deleted Successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Eror in delete Job API",
        error,
      });
    }
  };
  // UPDATE A JOB
const updateJobController = async (req, res) => {
    try {
        const { id } = req.params;
        const { JobName, Description, Picture } = req.body;

        // Check if the job exists
        const job = await jobs.findById(id);
        if (!job) {
            return res.status(404).send({
                success: false,
                message: "Job not found"
            });
        }

        // Update the job fields
        job.JobName = JobName || job.JobName;
        job.Description = Description || job.Description;
        job.Picture = Picture || job.Picture;

        // Save the updated job
        await job.save();

        res.status(200).send({
            success: true,
            message: "Job updated successfully",
            data: job
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in the Update Job API",
            error
        });
    }
};
  
module.exports={
    createJobController,
    getJobByNameController,
    getJobByIdController,
    getAllJobsController,
    updateJobController,
    deleteJobController
}