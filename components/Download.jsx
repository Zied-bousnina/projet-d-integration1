import React, { useContext, useState } from "react";
import Previewstyle from "../styles/Preview.module.css";
import { useRouter } from "next/router";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";
import { fill } from "@cloudinary/url-gen/actions/resize";
import { focusOn } from "@cloudinary/url-gen/qualifiers/gravity";
import { FocusOn } from "@cloudinary/url-gen/qualifiers/focusOn";
import { BsFillTelephoneFill } from "react-icons/bs";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import { useEffect } from "react";

const Download = React.forwardRef((props, ref) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [alldata, setAlldata] = useState();

  const cld = new Cloudinary({
    cloud: {
      cloudName: "femakin",
    },
  });

  useEffect(() => {
    let newObjectuser = JSON.parse(localStorage.getItem("user_id"));

    let UserDetails = JSON.parse(localStorage.getItem("user_details"));

    setLoading(false);

    router.replace("/cv/preview", undefined, { shallow: true });

    fetch("/api/fetchall", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      method: "GET",
    })
      .then((response) => response.json())
      .then((response) => {
        let Available_Id =
          newObjectuser.unique_id === undefined
            ? UserDetails.unique_id
            : newObjectuser.unique_id;

        setAlldata(response?.filter((x) => x?.unique_id === Available_Id));

        JSON.stringify({
          steponedata: {
            Full_name: `${response[0]?.Full_name}`,
            Email: `${response[0]?.Email}`,
            Role: `${response[0]?.Role}`,
            Phone_number: `${response[0]?.Phone_number}`,
            Address: `${response[0]?.Address}`,
            Profile_Photo_Url: `${response[0]?.Profile_Photo_Url}`,
            Public_id: `${response[0]?.Public_id}`,
            unique_id: `${response[0]?.unique_id}`,
            profile_phot_public_id: `${response[0]?.Public_id}`,
            img_url: `${response[0]?.Profile_Photo_Url}`,
          },
          img_url: `${response[0]?.Profile_Photo_Url}`,
          unique_id: `${response[0]?.unique_id}`,
          profile_phot_public_id: `${response[0]?.Public_id}`,
        });

        setLoading(true);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      {!loading ? (
        <h1
          style={{
            marginTop: "40px",
          }}
        >
          loading....
        </h1>
      ) : (
        <div ref={ref}>
          {alldata.map((x, i) => {
            return (
              <>
                <section className={Previewstyle.top_summary}>
                  <section className={Previewstyle.right_details}>
                    <div className={Previewstyle.full_nameandrole}>
                      <div className={Previewstyle.fullname}>
                        <h1>{x?.Full_name}</h1>
                      </div>

                      <div className={Previewstyle.role}>
                        {" "}
                        <h2>{x?.Role}</h2>
                      </div>
                    </div>

                    <div className={Previewstyle.titleandcontacts}>
                      <div className={Previewstyle.contacts}>
                        <div className={Previewstyle.mobile}>
                          <div>
                            <BsFillTelephoneFill />
                          </div>
                          <div>{x?.Phone_number}</div>
                        </div>

                        <div className={Previewstyle.email}>
                          <div>
                            <MdOutlineAlternateEmail />
                          </div>
                          <div>{x?.Email}</div>
                        </div>

                        <div className={Previewstyle.address}>
                          <div>
                            <CiLocationOn />
                          </div>
                          <div>{x?.Address}</div>
                        </div>
                      </div>
                    </div>
                  </section>

                  <section className={Previewstyle.top_img}>
                    <AdvancedImage
                      cldImg={cld
                        .image(`${x?.Public_id}`)
                        .resize(
                          fill()
                            .width(100)
                            .height(100)
                            .gravity(focusOn(FocusOn.faces()))
                        )}
                    />
                  </section>
                </section>

                <section className={Previewstyle.skills_section}>
                  <h1>Skills</h1>

                  <ul className={Previewstyle.skills_items}>
                    <li key={x?.Skill}>{x?.Skill}</li>
                  </ul>
                </section>

                <section className={Previewstyle.skills_section}>
                  <h1 className={Previewstyle.title}>Experience</h1>

                  <div className={Previewstyle.skills_items}>
                    <h1>
                      <span className={Previewstyle.sub_title}>
                        {x?.Employer_Ex}, {x?.City_town_Ex}
                      </span>{" "}
                      <span className={Previewstyle?.inner_sub_title}>
                        {" "}
                        - {x?.Role}
                      </span>
                    </h1>

                    <ol className={Previewstyle.skills_items}>
                      <li key={x?.Achievement_one_Ex}>
                        {x?.Achievement_one_Ex}
                      </li>
                      <li key={x?.Achievement_two_Ex}>
                        {x?.Achievement_two_Ex}
                      </li>
                      <li key={x?.Achievement_three_Ex}>
                        {x?.Achievement_three_Ex}
                      </li>
                    </ol>
                  </div>
                </section>

                <section className={Previewstyle.skills_section}>
                  <h1 className={Previewstyle.title}>Education</h1>

                  <div className={Previewstyle.skills_items}>
                    <h1 className={Previewstyle.date}>
                      {x?.Start_date_Ed} - {x?.End_date_Ed}
                    </h1>
                    <h2>
                      {x?.School_Ed}, {x?.City_Ed} - {x?.Degree_Ed}
                    </h2>
                  </div>
                </section>

                <section className={Previewstyle.skills_section}>
                  <h1 className={Previewstyle.title}>Awards</h1>

                  <div className={Previewstyle.skills_items}>
                    <ul className={Previewstyle.skills_items}>
                      <li key={x?.Award_one_Ed}>{x?.Award_one_Ed}</li>
                      <li key={x?.Award_two_Ed}>{x?.Award_two_Ed}</li>
                      <li key={x?.Award_three_Ed}>{x?.Award_three_Ed}</li>
                    </ul>
                  </div>
                </section>
                <section className={Previewstyle.skills_section}>
                  <h1 className={Previewstyle?.title}>Interest</h1>

                  <div className={Previewstyle?.skills_items}>
                    <ul className={Previewstyle?.skills_items}>
                      <li key={x?.Hobby}>{x?.Hobby}</li>
                    </ul>
                  </div>
                </section>

                <section className={Previewstyle.skills_section}>
                  <h1 className={Previewstyle.title}>Language(s)</h1>

                  <div className={Previewstyle.skills_items}>
                    <h2 className={Previewstyle.date}>{x?.Language}</h2>
                  </div>
                </section>

                <section className={Previewstyle.skills_section}>
                  <h1 className={Previewstyle.title}>Certificate</h1>

                  <section className={Previewstyle.skills_section}>
                    <AdvancedImage
                      cldImg={cld
                        .image(`${x?.Cert_Public_Id}`)
                        .resize(
                          fill()
                            .width(200)
                            .height(200)
                            .gravity(focusOn(FocusOn.faces()))
                        )}
                    />
                  </section>
                </section>

                <section className={Previewstyle.skills_section}>
                  <h1 className={Previewstyle.title}>References</h1>

                  <div className={Previewstyle.skills_items}>
                    <h2>Company Name- {x?.Company_name_Rfx}</h2>
                    <h2>Contact Person- {x?.Contact_person_Rfx}</h2>
                    <h2>Phone Number- {x?.Phone_number_Rfx}</h2>
                    <h2>Email Address- {x?.Email_Address_Rfx}</h2>
                  </div>
                </section>
              </>
            );
          })}
        </div>
      )}
    </div>
  );
});

export default Download;
