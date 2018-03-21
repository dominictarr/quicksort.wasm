(module
  (memory (export "memory") 1)
  (func $partition (param $lo i32) (param $hi i32) (param $pivot i32) (result i32)
    (local $tmp i32)
    (if
      (i32.gt_u (i32.add (get_local $lo) (i32.const 4)) (get_local $hi))
      (return (get_local $hi))
    )

    (loop $forever

      ;; increase lower bound
      (loop $while1
        (if
          (i32.lt_s (i32.load (get_local $lo)) (get_local $pivot))
          (then
            (set_local $lo (i32.add (get_local $lo) (i32.const 4)))
            (br $while1)
      )))

      ;; increase upper bound

      (loop $while2
        (if
        (i32.gt_s (i32.load (get_local $hi)) (get_local $pivot))
        (then
          (set_local $hi (i32.sub (get_local $hi) (i32.const 4)))
          (br $while2)
      )))

      ;; return if we are sorted

      (if
        (i32.ge_u (get_local $lo) (get_local $hi))
        (return (get_local $hi))
      )

      ;; swap hi and lo

      (set_local $tmp (i32.load (get_local $hi)))
      (i32.store (get_local $hi) (i32.load (get_local $lo)) )
      (i32.store (get_local $lo) (get_local $tmp) )

      (set_local $hi (i32.sub (get_local $hi) (i32.const 4)))

      (br $forever)
    )

    (get_local $hi)
  )

  (func $sort (param $lo i32) (param $hi i32) (result i32)
    (local $mid i32)

    (if
      (i32.ge_s (get_local $lo) (get_local $hi))
      (return (get_local $hi))
    )

    ;; this is ugly. pretty sure could tidy up but this works

    (set_local $mid
      (i32.mul
        (i32.div_s
          (i32.div_s (i32.add (get_local $lo) (get_local $hi)) (i32.const 4))
          (i32.const 2)
        )
        (i32.const 4)
    ))

    (set_local $mid (call $partition
      (get_local $lo)
      (get_local $hi)
      (i32.load (get_local $mid))
    ))

    (call $sort
      (get_local $lo)
      (i32.sub (get_local $mid) (i32.const 4))
    )
    (drop)

    (call $sort
      (i32.add (get_local $mid) (i32.const 4))
      (get_local $hi)
    )
    (drop)

    (get_local $mid)
  )

  (export "partition" (func $partition))
  (export "sort" (func $sort))
)

