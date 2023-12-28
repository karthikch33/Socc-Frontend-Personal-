import React from 'react'
const Banner = () => {
  return (
    <>
     <section className="hero-banner py-5">
                <div className="container">
                    <div className="row row align-items-center">
                        <div className="col-lg-5 offset-lg-1 order-lg-1 floating-image">
                            <img src="https://www.markuptag.com/images/web-development-vector.png" className="img-fluid" alt="Web Development" />
                        </div>
                        <div className="col-lg-6">
                            <h1 className="mt-3">School Of Competitive Coding</h1>
                            <p className="lead text-dark my-5">
                            The School of Competitive Coding Club is committed to providing comprehensive training in coding, building strong problem-solving abilities, and fostering analytical and critical thinking. Unleashing one's coding potential and enabling coding enthusiasts for success in the rapidly evolving digital world is our club's credo</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
  )
}

export default Banner