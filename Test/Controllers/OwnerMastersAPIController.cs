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
    public class OwnerMastersAPIController : ApiController
    {
        private MainEntities1 db = new MainEntities1();

        // GET: api/OwnerMastersAPI
        public IQueryable<OwnerMaster> GetOwnerMasters()
        {
            return db.OwnerMasters;
        }

        // GET: api/OwnerMastersAPI/5
        [ResponseType(typeof(OwnerMaster))]
        public IHttpActionResult GetOwnerMaster(long id)
        {
            OwnerMaster ownerMaster = db.OwnerMasters.Find(id);
            if (ownerMaster == null)
            {
                return NotFound();
            }

            return Ok(ownerMaster);
        }

        // PUT: api/OwnerMastersAPI/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutOwnerMaster(long id, OwnerMaster ownerMaster)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != ownerMaster.Owner_No)
            {
                return BadRequest();
            }

            db.Entry(ownerMaster).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OwnerMasterExists(id))
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

        // POST: api/OwnerMastersAPI
        [ResponseType(typeof(OwnerMaster))]
        public IHttpActionResult PostOwnerMaster(OwnerMaster ownerMaster)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.OwnerMasters.Add(ownerMaster);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = ownerMaster.Owner_No }, ownerMaster);
        }

        // DELETE: api/OwnerMastersAPI/5
        [ResponseType(typeof(OwnerMaster))]
        public IHttpActionResult DeleteOwnerMaster(long id)
        {
            OwnerMaster ownerMaster = db.OwnerMasters.Find(id);
            if (ownerMaster == null)
            {
                return NotFound();
            }

            foreach (var i in db.OwnerDetails)
            {
                if (i.Owner_No == id)
                {
                    db.OwnerDetails.Remove(i);
                }
            }

            db.OwnerMasters.Remove(ownerMaster);
            db.SaveChanges();

            return Ok(ownerMaster);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool OwnerMasterExists(long id)
        {
            return db.OwnerMasters.Count(e => e.Owner_No == id) > 0;
        }
    }
}