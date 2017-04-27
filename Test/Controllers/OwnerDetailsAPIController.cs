using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using Test;

namespace Test.Controllers
{
    public class OwnerDetailsAPIController : ApiController
    {
        private MainEntities1 db = new MainEntities1();

        // GET: api/OwnerDetailsAPI
        public IQueryable<OwnerDetail> GetOwnerDetails()
        {
            return db.OwnerDetails;
            //return from i in db.OwnerDetails where i.Owner_No == id select i;
        }

        // GET: api/OwnerDetailsAPI/5
        [ResponseType(typeof(OwnerDetail))]
        public IQueryable<OwnerDetail> GetOwnerDetails(int id)
        {
            foreach (var r in db.OwnerMasters)
            {
                if (r.Owner_No == id)
                {
                    var dbcount = from i in db.OwnerDetails where i.Owner_No == id select i;
                    r.Count = dbcount.ToList().Count;
                    db.SaveChanges();
                }
            }
            return from i in db.OwnerDetails where i.Owner_No == id select i;
        }

        [ResponseType(typeof(OwnerDetail))]
        public IHttpActionResult GetOwnerDetailer(long id)
        {
            OwnerDetail ownerDetail = db.OwnerDetails.Find(id);
            if (ownerDetail == null)
            {
                return NotFound();
            }

            return Ok(ownerDetail);
        }

        // PUT: api/OwnerDetailsAPI/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutOwnerDetail(long id, OwnerDetail ownerDetail)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != ownerDetail.Owner_detail_No)
            {
                return BadRequest();
            }

            db.Entry(ownerDetail).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OwnerDetailExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/OwnerDetailsAPI
        [ResponseType(typeof(OwnerDetail))]
        public IHttpActionResult PostOwnerDetail(OwnerDetail ownerDetail)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.OwnerDetails.Add(ownerDetail);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = ownerDetail.Owner_detail_No }, ownerDetail);
        }

        // DELETE: api/OwnerDetailsAPI/5
        [ResponseType(typeof(OwnerDetail))]
        public IHttpActionResult DeleteOwnerDetail(long id)
        {
            OwnerDetail ownerDetail = db.OwnerDetails.Find(id);
            if (ownerDetail == null)
            {
                return NotFound();
            }

            db.OwnerDetails.Remove(ownerDetail);
            db.SaveChanges();

            return Ok(ownerDetail);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool OwnerDetailExists(long id)
        {
            return db.OwnerDetails.Count(e => e.Owner_detail_No == id) > 0;
        }
    }
}